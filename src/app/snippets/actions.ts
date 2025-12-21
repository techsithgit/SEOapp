"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ActionResult =
  | { success: true }
  | { success: false; error: string };

export async function createSnippet(formData: FormData): Promise<ActionResult> {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const slug = (formData.get("slug") ?? "").toString().trim();

  if (!title || !description || !slug) {
    return { success: false, error: "All fields are required" };
  }

  try {
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
    return { success: true };
  } catch (error) {
    console.error("Error saving snippet", error);
    return { success: false, error: "Could not save snippet" };
  }
}

export async function deleteSnippet(snippetId: string): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await prisma.snippet.delete({
      where: { id: snippetId, userId: session.user.id },
    });
    revalidatePath("/snippets");
    return { success: true };
  } catch (error) {
    console.error("Error deleting snippet", error);
    return { success: false, error: "Could not delete snippet" };
  }
}

export async function updateSnippet(
  id: string,
  formData?: FormData
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  if (!formData) {
    return { success: false, error: "No data submitted" };
  }

  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const slug = (formData.get("slug") ?? "").toString().trim();

  if (!title || !description || !slug) {
    return { success: false, error: "All fields are required" };
  }

  try {
    await prisma.snippet.update({
      where: { id, userId: session.user.id },
      data: { title, description, slug },
    });
    revalidatePath("/snippets");
    revalidatePath(`/snippets/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating snippet", error);
    return { success: false, error: "Could not update snippet" };
  }
}

export async function createVariant(
  snippetId: string,
  formData?: FormData
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  if (!formData) {
    return { success: false, error: "No data submitted" };
  }

  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const label = (formData.get("label") ?? "").toString().trim();

  if (!title || !description) {
    return { success: false, error: "Title and description required" };
  }

  try {
    const snippet = await prisma.snippet.findFirst({
      where: { id: snippetId, userId: session.user.id },
      select: { id: true },
    });
    if (!snippet) {
      return { success: false, error: "Snippet not found" };
    }

    await prisma.variant.create({
      data: {
        title,
        description,
        label: label || null,
        snippetId,
      },
    });
    revalidatePath(`/snippets/${snippetId}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating variant", error);
    return { success: false, error: "Could not create variant" };
  }
}

export async function deleteVariant(
  snippetId: string,
  variantId: string
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const variant = await prisma.variant.findFirst({
      where: { id: variantId, snippet: { userId: session.user.id, id: snippetId } },
      select: { id: true },
    });
    if (!variant) {
      return { success: false, error: "Variant not found" };
    }

    await prisma.variant.delete({ where: { id: variantId } });
    revalidatePath(`/snippets/${snippetId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting variant", error);
    return { success: false, error: "Could not delete variant" };
  }
}

export async function updateVariant(
  snippetId: string,
  variantId: string,
  formData?: FormData
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  if (!formData) {
    return { success: false, error: "No data submitted" };
  }

  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const label = (formData.get("label") ?? "").toString().trim();

  if (!title || !description) {
    return { success: false, error: "Title and description required" };
  }

  try {
    const variant = await prisma.variant.findFirst({
      where: { id: variantId, snippet: { id: snippetId, userId: session.user.id } },
      select: { id: true },
    });
    if (!variant) {
      return { success: false, error: "Variant not found" };
    }

    await prisma.variant.update({
      where: { id: variantId },
      data: { title, description, label: label || null },
    });
    revalidatePath(`/snippets/${snippetId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating variant", error);
    return { success: false, error: "Could not update variant" };
  }
}
