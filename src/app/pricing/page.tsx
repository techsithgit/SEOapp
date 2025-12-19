import { Check, Lock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Desktop SERP preview with live counters.",
    cta: "Start free",
    features: [
      "Desktop Google preview",
      "Title and description counters",
      "Warnings panel",
      "No login required",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    badge: "Most popular",
    description: "Unlock mobile preview and Pro quick actions.",
    cta: "Upgrade",
    features: [
      "Mobile preview unlocked",
      "Pro quick actions",
      "Saved presets (coming soon)",
      "Priority support",
    ],
  },
  {
    name: "Agency",
    price: "$29",
    description: "For teams that need consistency across pages.",
    cta: "Talk to us",
    features: [
      "Team-ready workspaces",
      "Brand presets",
      "Approval-ready previews",
      "Onboarding help",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 lg:py-14">
      <div className="text-center">
        <Badge variant="secondary" className="mb-3">
          Simple pricing
        </Badge>
        <h1 className="text-3xl font-semibold text-foreground">
          Choose the plan that fits
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start free. Upgrade when you need mobile accuracy and Pro fixes.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.name === "Pro" ? "border-primary shadow-md" : ""}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                {tier.badge ? (
                  <Badge variant="outline" className="text-primary">
                    {tier.badge}
                  </Badge>
                ) : null}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                variant={tier.name === "Pro" ? "default" : "outline"}
              >
                {tier.name === "Pro" ? <Lock className="mr-2 h-4 w-4" /> : null}
                {tier.cta}
              </Button>
              <Separator />
              <ul className="space-y-2 text-sm text-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
