"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { AlertTriangle, Info, Lock, Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Status = "Good" | "Too Long" | "Too Short";
type RewriteRisk = "Low" | "Medium" | "High";
type Reason = string;

type WarningItem = {
  id: string;
  title: string;
  description: string;
  fix: string;
};

const TITLE_MIN_CHARS = 35;
const TITLE_MAX_CHARS = 70;
const TITLE_PIXEL_LIMIT = 580;
const MOBILE_TITLE_PIXEL_LIMIT = 520;
const DESCRIPTION_MIN_CHARS = 110;
const DESCRIPTION_MAX_CHARS = 165;
const DESCRIPTION_PREVIEW_LIMIT = 156;
const MOBILE_DESCRIPTION_PREVIEW_LIMIT = 140;
const DOMAIN = "serpify.io";

const quickActions = [
  "Generate alternatives",
  "Improve CTR",
  "Shorten title",
  "Add keyword",
];

function getRewriteRisk(title: string, description: string): RewriteRisk {
  const titleLen = title.length;
  const descLen = description.length;
  if (titleLen === 0 && descLen === 0) return "Low";
  if (titleLen > TITLE_MAX_CHARS + 5 || descLen > DESCRIPTION_MAX_CHARS + 10) {
    return "High";
  }
  if (titleLen < TITLE_MIN_CHARS || descLen < DESCRIPTION_MIN_CHARS - 20) {
    return "Medium";
  }
  return "Low";
}

function getCtrScore(title: string, description: string) {
  let score = 60;
  if (title.length >= 45 && title.length <= 65) score += 10;
  if (description.length >= 120 && description.length <= 155) score += 10;
  if (/ ?[:\-|–] /.test(title)) score += 5;
  score = Math.min(100, Math.max(30, score));
  return score;
}

function getRewriteReasons(title: string, description: string): Reason[] {
  const reasons: Reason[] = [];
  if (title.length > TITLE_MAX_CHARS) {
    reasons.push("Title likely to be truncated on desktop.");
  }
  if (description.length > DESCRIPTION_MAX_CHARS) {
    reasons.push("Description exceeds typical desktop limits.");
  }
  if (title.length < TITLE_MIN_CHARS) {
    reasons.push("Add more context to the title for clarity.");
  }
  if (description.length < DESCRIPTION_MIN_CHARS) {
    reasons.push("Description can include a clearer benefit/CTA.");
  }
  if (reasons.length === 0) reasons.push("Within safe length ranges.");
  return reasons;
}

function getCtrReasons(title: string, description: string): Reason[] {
  const reasons: Reason[] = [];
  if (title.length >= 45 && title.length <= 65) {
    reasons.push("Title length is scannable and keyword-ready.");
  } else {
    reasons.push("Adjust title length to ~55–65 characters.");
  }
  if (description.length >= 120 && description.length <= 155) {
    reasons.push("Description fits common SERP viewports.");
  } else {
    reasons.push("Keep description within 120–155 characters.");
  }
  if (/ ?[:\-|–] /.test(title)) {
    reasons.push("Title uses a divider, improving clarity.");
  } else {
    reasons.push("Consider a divider (| or –) to separate hooks.");
  }
  return reasons;
}

const charWidthMap: Record<string, number> = {
  i: 4.5,
  l: 4.8,
  j: 5,
  f: 6,
  r: 6,
  t: 6,
  s: 6.5,
  a: 7,
  c: 7,
  e: 7,
  g: 7,
  h: 7,
  k: 7,
  n: 7,
  o: 7,
  p: 7,
  q: 7,
  u: 7,
  v: 7,
  w: 9,
  m: 10,
  x: 6.5,
  y: 6.5,
  b: 7,
  d: 7,
  z: 6.5,
  " ": 4,
};

function estimatePixelWidth(text: string) {
  let width = 0;
  for (const char of text) {
    const key = char.toLowerCase();
    width += charWidthMap[key] ?? 8;
  }
  return Math.round(width);
}

function truncateByPixels(text: string, limit: number) {
  let width = 0;
  let output = "";

  for (const char of text) {
    const next = width + (charWidthMap[char.toLowerCase()] ?? 8);
    if (next > limit) {
      return `${output.trimEnd()}...`;
    }
    width = next;
    output += char;
  }

  return output || "Preview your title here";
}

function truncateByChars(text: string, limit: number) {
  if (!text) {
    return "Preview your description here";
  }
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit).trimEnd()}...`;
}

function getStatus(
  value: string,
  min: number,
  max: number,
  pixels?: number
): Status {
  if (!value.length || value.length < min) return "Too Short";
  if (value.length > max) return "Too Long";
  if (typeof pixels === "number" && pixels > TITLE_PIXEL_LIMIT) return "Too Long";
  return "Good";
}

function statusBadgeClasses(status: Status) {
  if (status === "Good") {
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }
  if (status === "Too Long") {
    return "bg-red-100 text-red-700 border-red-200";
  }
  return "bg-amber-100 text-amber-800 border-amber-200";
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      className={cn(
        "border px-3 py-1 text-xs font-medium whitespace-nowrap pointer-events-none hover:bg-inherit hover:text-inherit",
        statusBadgeClasses(status)
      )}
    >
      {status}
    </Badge>
  );
}

function WarningsPanel({ warnings }: { warnings: WarningItem[] }) {
  const lockedButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">
          <Button
            variant="secondary"
            disabled
            aria-disabled
            className="gap-2 bg-muted text-foreground opacity-70"
          >
            <Lock className="h-4 w-4" />
            Apply fix
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>Available on Pro. Upgrade to unlock.</TooltipContent>
    </Tooltip>
  );

  if (!warnings.length) {
    return (
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            Warnings & Suggestions
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Looking good. No active warnings.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Warnings & Suggestions
        </CardTitle>
        <CardDescription>
          Address these to keep your snippet within Google&apos;s safe zone.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" className="divide-y">
          {warnings.map((warning) => (
            <AccordionItem key={warning.id} value={warning.id}>
              <AccordionTrigger className="px-6 py-3 text-left text-sm font-semibold">
                {warning.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-3 px-6 pb-5 pt-1 text-sm">
                <p className="text-muted-foreground">{warning.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-foreground">
                    Suggested fix: {warning.fix}
                  </p>
                  {lockedButton}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function PreviewBlock({
  title,
  description,
  url,
  status,
  rewriteRisk,
  ctrScore,
  rewriteReasons,
  ctrReasons,
}: {
  title: string;
  description: string;
  url: string;
  status: Status;
  rewriteRisk: RewriteRisk;
  ctrScore: number;
  rewriteReasons: Reason[];
  ctrReasons: Reason[];
}) {
  const riskColors: Record<RewriteRisk, string> = {
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    High: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-semibold">
          SL
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium text-foreground">{url}</p>
          <p className="text-xs text-muted-foreground">Secure • Preview</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>
      <p className="text-xl font-semibold leading-snug text-[#1a0dab]">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-[#4d5156]">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Badge
          variant="outline"
          className={cn("border px-3 py-1 text-xs font-medium", riskColors[rewriteRisk])}
        >
          Rewrite risk: {rewriteRisk}
        </Badge>
        <Badge variant="secondary" className="border px-3 py-1 text-xs font-medium">
          CTR score: {ctrScore}/100
        </Badge>
      </div>
      <div className="grid gap-2 pt-1 text-xs text-muted-foreground sm:grid-cols-2">
        <div>
          <p className="font-semibold text-foreground">Rewrite hints</p>
          <ul className="list-disc pl-4">
            {rewriteReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground">CTR hints</p>
          <ul className="list-disc pl-4">
            {ctrReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LockedOverlay({ isPro }: { isPro: boolean }) {
  if (isPro) return null;
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg border bg-white/85 backdrop-blur">
      <p className="text-center text-sm font-semibold text-foreground">
        Mobile preview is a Pro feature.
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Upgrade to unlock mobile accuracy and rewrite safety checks.
      </p>
      <Button className="gap-2">
        <Lock className="h-4 w-4" />
        Upgrade
      </Button>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userPlan = (session?.user?.plan ?? "free").toString().toLowerCase();
  const isPro = userPlan === "pro" || userPlan === "agency";
  const initialTitle =
    searchParams.get("title") ||
    "Launch Serpify: Fast Google SERP Preview Tool";
  const initialDescription =
    searchParams.get("description") ||
    "Preview exactly how your page title and meta description render on Google, spot truncation, and keep CTR high with a calm, focused workflow.";
  const initialSlug = searchParams.get("slug") || "blog/google-serp-preview-tool";

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [slug, setSlug] = useState(initialSlug);
  const [activePreview, setActivePreview] = useState("desktop");

  useEffect(() => {
    const newTitle = searchParams.get("title");
    const newDescription = searchParams.get("description");
    const newSlug = searchParams.get("slug");

    if (newTitle) setTitle(newTitle);
    if (newDescription) setDescription(newDescription);
    if (newSlug) setSlug(newSlug);
  }, [searchParams]);

  const cleanSlug = slug.replace(/^\/+/, "");
  const fullUrl = `${DOMAIN}/${cleanSlug || "your-page"}`;

  const titlePixelWidth = useMemo(() => estimatePixelWidth(title), [title]);
  const titleStatus = useMemo<Status>(
    () => getStatus(title, TITLE_MIN_CHARS, TITLE_MAX_CHARS, titlePixelWidth),
    [title, titlePixelWidth]
  );
  const descriptionStatus = useMemo<Status>(
    () =>
      getStatus(
        description,
        DESCRIPTION_MIN_CHARS,
        DESCRIPTION_MAX_CHARS
      ),
    [description]
  );

  const truncatedTitleDesktop = useMemo(
    () => truncateByPixels(title || "Preview your title here", TITLE_PIXEL_LIMIT),
    [title]
  );
  const truncatedTitleMobile = useMemo(
    () =>
      truncateByPixels(title || "Preview your title here", MOBILE_TITLE_PIXEL_LIMIT),
    [title]
  );
  const truncatedDescriptionDesktop = useMemo(
    () => truncateByChars(description, DESCRIPTION_PREVIEW_LIMIT),
    [description]
  );
  const truncatedDescriptionMobile = useMemo(
    () => truncateByChars(description, MOBILE_DESCRIPTION_PREVIEW_LIMIT),
    [description]
  );

  const rewriteRisk = useMemo(
    () => getRewriteRisk(title, description),
    [title, description]
  );
  const ctrScore = useMemo(() => getCtrScore(title, description), [title, description]);
  const rewriteReasons = useMemo(
    () => getRewriteReasons(title, description),
    [title, description]
  );
  const ctrReasons = useMemo(() => getCtrReasons(title, description), [title, description]);

  const warnings: WarningItem[] = useMemo(() => {
    const issues: WarningItem[] = [];
    if (titleStatus === "Too Long") {
      issues.push({
        id: "title-long",
        title: "Title too long",
        description:
          "Google typically truncates titles beyond ~580px or 65 characters. Shorten it so the key phrase stays visible.",
        fix: "Trim to 55-65 characters and keep the main keyword near the front.",
      });
    }
    if (titleStatus === "Too Short" && title.length > 0) {
      issues.push({
        id: "title-short",
        title: "Title might be too short",
        description:
          "Short titles can underuse available space and miss important qualifiers.",
        fix: "Aim for at least 35-50 characters with a clear value hook.",
      });
    }
    if (descriptionStatus === "Too Long") {
      issues.push({
        id: "description-long",
        title: "Description too long",
        description:
          "Meta descriptions beyond ~155 characters may be truncated and lose the CTA.",
        fix: "Keep the hook within 120-155 characters for most devices.",
      });
    }
    if (descriptionStatus === "Too Short" && description.length > 0) {
      issues.push({
        id: "description-short",
        title: "Description might be too short",
        description:
          "You have room to include benefits or a short CTA to improve click-through rate.",
        fix: "Use at least 110 characters to preview a complete snippet.",
      });
    }
    return issues;
  }, [titleStatus, descriptionStatus, title.length, description.length]);

  return (
    <TooltipProvider>
      <div className="bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 md:py-10">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Live Google SERP Preview
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-semibold leading-tight text-foreground">
                  Google SERP Preview
                </h1>
                <p className="text-sm text-muted-foreground">
                  Type your title and meta description to see instant desktop and
                  mobile previews, status badges, and warnings.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs text-muted-foreground shadow-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Preview updates instantly while you type.
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="order-1 space-y-6 lg:order-1">
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Snippet inputs</CardTitle>
                  <CardDescription>
                    Keep your primary keyword near the start and stay inside the
                    pixel-safe zone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="title">Page Title</Label>
                        <p className="text-xs text-muted-foreground">
                          Aim for a scannable, clickable headline.
                        </p>
                      </div>
                      <StatusBadge status={titleStatus} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex flex-wrap items-center gap-2">
                        <span>{title.length} characters</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Tooltip>
                          <TooltipTrigger className="inline-flex items-center gap-1">
                            <Info className="h-3.5 w-3.5" />
                            <span>{titlePixelWidth} px</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Google truncates based on pixels (~580px). Stay under
                            the limit to avoid cutoffs.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Target: 55-65 characters or under 580px
                      </span>
                    </div>
                    <Input
                      id="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Write a compelling title..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="description">Meta Description</Label>
                        <p className="text-xs text-muted-foreground">
                          Summarize the value, include a soft CTA, and stay in the
                          safe zone for mobile.
                        </p>
                      </div>
                      <StatusBadge status={descriptionStatus} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{description.length} characters</span>
                      <span className="text-[11px] font-medium">
                        Target: 120-155 characters
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Describe the promise and why people should click..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL / Slug</Label>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{DOMAIN}/</span>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(event) => setSlug(event.target.value)}
                        className="border-none bg-transparent px-0 focus-visible:ring-0"
                        placeholder="your-page"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Breadcrumbs help users trust the result and scan quickly.
                    </p>
                  </div>

                  <div className="space-y-3 rounded-lg border bg-gradient-to-r from-slate-50 to-white p-4">
                    <div className="flex items-center justify-between gap-2 text-sm font-medium">
                      <span>Quick actions</span>
                      {isPro ? (
                        <Badge variant="secondary" className="uppercase">
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Lock className="h-3 w-3" />
                          Pro
                        </Badge>
                      )}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {quickActions.map((action) =>
                        isPro ? (
                          <Button
                            key={action}
                            variant="outline"
                            className="justify-start gap-2 bg-white text-left text-sm font-medium"
                          >
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            {action}
                          </Button>
                        ) : (
                          <Tooltip key={action}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                aria-disabled
                                className="justify-start gap-2 border-dashed bg-white text-left text-sm font-medium text-muted-foreground"
                              >
                                <Lock className="h-4 w-4" />
                                {action}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Available on Pro. Upgrade to unlock.
                            </TooltipContent>
                          </Tooltip>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="hidden lg:block">
                <WarningsPanel warnings={warnings} />
              </div>
            </div>

            <div className="order-2 lg:order-2">
              <Card className="h-full shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    Live Preview
                    <Badge variant="secondary" className="text-xs">
                      Desktop + Mobile tabs
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Switch views without losing your spot. No reloads.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs
                    value={activePreview}
                    onValueChange={setActivePreview}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="desktop">Desktop</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="desktop" className="mt-4">
                      <PreviewBlock
                        title={truncatedTitleDesktop}
                        description={truncatedDescriptionDesktop}
                        url={fullUrl}
                        status={titleStatus}
                        rewriteRisk={rewriteRisk}
                        ctrScore={ctrScore}
                        rewriteReasons={rewriteReasons}
                        ctrReasons={ctrReasons}
                      />
                    </TabsContent>
                    <TabsContent value="mobile" className="mt-4">
                      <div className="relative">
                        <div className="scale-[0.95] transform">
                          <PreviewBlock
                            title={truncatedTitleMobile}
                            description={truncatedDescriptionMobile}
                            url={fullUrl}
                            status={titleStatus}
                            rewriteRisk={rewriteRisk}
                            ctrScore={ctrScore}
                            rewriteReasons={rewriteReasons}
                            ctrReasons={ctrReasons}
                          />
                        </div>
                        <LockedOverlay isPro={isPro} />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="rounded-lg border bg-muted/60 px-4 py-3 text-xs text-muted-foreground">
                    {isPro
                      ? "Mobile and desktop previews are fully unlocked on your plan."
                      : "Desktop preview stays unlocked. Upgrade to test mobile safely and avoid mid-SERP cutoffs."}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-3 lg:hidden">
              <WarningsPanel warnings={warnings} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
