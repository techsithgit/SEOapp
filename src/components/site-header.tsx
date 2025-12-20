"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

const navLinkStyles =
  "text-xs sm:text-sm font-medium text-muted-foreground transition hover:text-foreground";

export function SiteHeader() {
  const { data: session } = useSession();
  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ??
    session?.user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:gap-4 overflow-hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm overflow-hidden">
            <Image src="/logo.svg" alt="Serpify logo" width={40} height={40} priority />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold text-foreground">Serpify</p>
            <p className="text-xs text-muted-foreground hidden sm:block">Google SERP Preview</p>
          </div>
        </Link>
        <div className="flex flex-shrink-0 items-center justify-end gap-2 sm:gap-3">
          <Link href="/pricing" className={`${navLinkStyles} hidden sm:inline-block`}>
            Pricing
          </Link>
          {session ? (
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <div className="flex items-center gap-2 rounded-full border bg-white px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  {userInitial}
                </div>
                <div className="hidden flex-col leading-tight sm:flex">
                  <span className="text-foreground truncate max-w-[120px]">
                    {session.user?.name ?? session.user?.email}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {(session.user?.plan ?? "free").toString()}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden px-3 text-xs sm:inline-flex sm:text-sm"
              >
                Sign out
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-2 text-[11px] sm:hidden"
              >
                Out
              </Button>
              <Button
                asChild
                size="sm"
                className="px-3 text-[11px] sm:text-sm whitespace-nowrap"
              >
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" className={navLinkStyles}>
                Login
              </Link>
              <Button
                asChild
                size="sm"
                className="ml-1 px-3 text-[11px] sm:ml-2 sm:text-sm whitespace-nowrap"
              >
                <Link href="/pricing">Upgrade</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
