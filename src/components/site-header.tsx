import Link from "next/link";

import { Button } from "@/components/ui/button";

const navLinkStyles =
  "text-sm font-medium text-muted-foreground transition hover:text-foreground";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm">
            S
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold text-foreground">SnippetLab</p>
            <p className="text-xs text-muted-foreground">Google SERP Preview</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className={navLinkStyles}>
            Pricing
          </Link>
          <Link href="#" className={navLinkStyles}>
            Login
          </Link>
          <Button>Upgrade</Button>
        </div>
      </div>
    </header>
  );
}
