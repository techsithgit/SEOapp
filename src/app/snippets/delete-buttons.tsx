"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteSnippet, deleteVariant } from "@/app/snippets/actions";
import { Button } from "@/components/ui/button";

type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
};

function ConfirmModal({
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="whitespace-nowrap"
        onClick={() => setOpen(true)}
        disabled={pending}
      >
        {confirmLabel}
      </Button>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                {cancelLabel}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await onConfirm();
                    setOpen(false);
                  })
                }
              >
                {pending ? "Deleting..." : confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DeleteSnippetButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <ConfirmModal
      title="Delete snippet"
      description="Are you sure you want to delete this snippet? This cannot be undone."
      onConfirm={async () => {
        await deleteSnippet(id);
        router.refresh();
      }}
    />
  );
}

export function DeleteVariantButton({
  snippetId,
  variantId,
}: {
  snippetId: string;
  variantId: string;
}) {
  const router = useRouter();
  return (
    <ConfirmModal
      title="Delete variant"
      description="Are you sure you want to delete this variant? This cannot be undone."
      onConfirm={async () => {
        await deleteVariant(snippetId, variantId);
        router.refresh();
      }}
    />
  );
}
