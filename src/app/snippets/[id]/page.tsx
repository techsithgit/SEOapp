import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { createVariant, updateVariant, updateSnippet } from "@/app/snippets/actions";
import { DeleteSnippetButton, DeleteVariantButton } from "@/app/snippets/delete-buttons";
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
import { getServerSession } from "next-auth";

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: snippetId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login required</CardTitle>
            <CardDescription>
              Sign in to edit your saved snippets.
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

  const snippet = await prisma.snippet.findFirst({
    where: { id: snippetId, userId: session.user.id },
    include: { variants: { orderBy: { updatedAt: "desc" } } },
  });

  if (!snippet) {
    notFound();
  }

  const updateSnippetAction = async (formData: FormData) => {
    "use server";
    await updateSnippet(snippetId, formData);
  };

  const createVariantAction = async (formData: FormData) => {
    "use server";
    await createVariant(snippetId, formData);
  };

  const updateVariantAction = async (variantId: string, formData: FormData) => {
    "use server";
    await updateVariant(snippetId, variantId, formData);
  };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Edit snippet</h1>
          <p className="text-sm text-muted-foreground">
            Update your saved title, description, and slug.
          </p>
        </div>
        <Badge variant="outline" className="uppercase">
          Plan: {(session.user.plan ?? "free").toString()}
        </Badge>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Snippet details</CardTitle>
          <CardDescription>Edit and save your snippet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={updateSnippetAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page title</Label>
              <Input id="title" name="title" defaultValue={snippet.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Meta description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={snippet.description}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={snippet.slug} required />
              <p className="text-xs text-muted-foreground">
                Must be unique per account. Changing it will update the saved record.
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={`/?title=${encodeURIComponent(snippet.title)}&description=${encodeURIComponent(snippet.description)}&slug=${encodeURIComponent(snippet.slug)}`}
                  >
                    Open in SERP tool
                  </Link>
                </Button>
                <DeleteSnippetButton id={snippet.id} />
              </div>
            </div>
          </CardContent>
        </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Create alternatives for this snippet.</CardDescription>
        </CardHeader>
          <CardContent className="space-y-4">
            <form action={createVariantAction} className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="variant-title">Variant title</Label>
              <Input id="variant-title" name="title" placeholder="Variant title..." required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="variant-description">Variant description</Label>
              <Textarea
                id="variant-description"
                name="description"
                rows={3}
                placeholder="Variant description..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant-label">Label (optional)</Label>
              <Input id="variant-label" name="label" placeholder="A/B label" />
            </div>
            <div className="flex items-end justify-end">
              <Button type="submit">Add variant</Button>
            </div>
          </form>

          <div className="rounded-lg border">
            {snippet.variants.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">No variants yet.</p>
            ) : (
              <div className="divide-y">
                {snippet.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="grid gap-2 px-4 py-3 sm:grid-cols-[1.2fr_1fr_auto]"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {variant.label ? `${variant.label} — ` : ""}
                        {variant.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {variant.description}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated {variant.updatedAt.toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        <Link href={`/?title=${encodeURIComponent(variant.title)}&description=${encodeURIComponent(variant.description)}&slug=${encodeURIComponent(snippet.slug)}`}>
                          Load in tool
                        </Link>
                      </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                      asChild
                    >
                      <Link href={`#variant-edit-${variant.id}`}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit inline
                      </Link>
                    </Button>
                    <DeleteVariantButton snippetId={snippet.id} variantId={variant.id} />
                  </div>
                    <div
                      id={`variant-edit-${variant.id}`}
                      className="sm:col-span-3 rounded-lg border bg-muted/60 p-4"
                    >
                      <form
                        className="grid gap-3 md:grid-cols-2"
                        action={(formData) => updateVariantAction(variant.id, formData)}
                      >
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`title-${variant.id}`}>Title</Label>
                          <Input
                            id={`title-${variant.id}`}
                            name="title"
                            defaultValue={variant.title}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`description-${variant.id}`}>Description</Label>
                          <Textarea
                            id={`description-${variant.id}`}
                            name="description"
                            rows={3}
                            defaultValue={variant.description}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`label-${variant.id}`}>Label</Label>
                          <Input
                            id={`label-${variant.id}`}
                            name="label"
                            defaultValue={variant.label ?? ""}
                            placeholder="A/B label"
                          />
                        </div>
                        <div className="flex items-end justify-end">
                          <Button type="submit" size="sm">
                            Save variant
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
