import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
import { Textarea } from "@/components/ui/textarea";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DeleteSnippetButton } from "@/app/snippets/delete-buttons";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function createSnippetAction(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return;
  }
  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const slug = (formData.get("slug") ?? "").toString().trim();

  if (!title || !description || !slug) {
    return;
  }

  const existing = await prisma.snippet.findFirst({
    where: { userId: session.user.id, slug },
    select: { id: true },
  });

  if (existing) {
    await prisma.snippet.update({
      where: { id: existing.id },
      data: { title, description },
    });
  } else {
    await prisma.snippet.create({
      data: {
        title,
        description,
        slug,
        userId: session.user.id,
      },
    });
  }
  revalidatePath("/snippets");
  redirect("/snippets");
}

export default async function SnippetsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login required</CardTitle>
            <CardDescription>
              Sign in to save snippets and manage variants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">Go to login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const snippets = await prisma.snippet.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: 20,
  });

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Saved snippets</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your snippet drafts. Up to 20 recent items shown.
          </p>
        </div>
        <Badge variant="outline" className="uppercase">
          Plan: {(session.user.plan ?? "free").toString()}
        </Badge>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>New snippet</CardTitle>
          <CardDescription>Save a title, description, and slug.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createSnippetAction} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Page title</Label>
              <Input id="title" name="title" placeholder="Your page title..." required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Meta description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Describe the promise and CTA..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="your-page" required />
              <p className="text-xs text-muted-foreground">
                Must be unique per account. Existing slugs will update the snippet.
              </p>
            </div>
            <div className="flex items-end justify-end">
              <Button type="submit">Save snippet</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent snippets</CardTitle>
          <CardDescription>Latest saved or updated snippets.</CardDescription>
        </CardHeader>
        <CardContent>
          {snippets.length === 0 ? (
            <p className="text-sm text-muted-foreground">No snippets yet.</p>
          ) : (
            <div className="divide-y rounded-lg border">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="grid gap-2 px-4 py-3 sm:grid-cols-[1.2fr_1fr_auto]"
                >
                  <div>
                    <p className="font-medium text-foreground">{snippet.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {snippet.description}
                    </p>
                </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">/{snippet.slug}</span>
                    <br />
                    <span className="text-xs">
                      Updated {snippet.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <Link href={`/snippets/${snippet.id}`}>Edit</Link>
                    </Button>
                    <DeleteSnippetButton id={snippet.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
