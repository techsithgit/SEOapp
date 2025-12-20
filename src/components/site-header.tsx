"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

const navLinkStyles =
  "text-xs sm:text-sm font-medium text-muted-foreground transition hover:text-foreground";

export function SiteHeader() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userInitial =
    session?.user?.name?.[0]?.toUpperCase() ??
    session?.user?.email?.[0]?.toUpperCase() ??
    "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Link href="/pricing" className={navLinkStyles}>
            Pricing
          </Link>
          <Button
            asChild
            size="sm"
            className="px-3 text-[11px] sm:text-sm whitespace-nowrap"
          >
            <Link href="/pricing">Upgrade</Link>
          </Button>
          {session ? (
            <div className="relative" ref={menuRef}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-2.5 text-xs sm:text-sm"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  {userInitial}
                </div>
                <span className="hidden sm:inline-flex max-w-[120px] truncate">
                  {session.user?.name ?? session.user?.email}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
              {menuOpen ? (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white p-2 shadow-md">
                  <div className="mb-2 rounded-md bg-muted/60 px-3 py-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {session.user?.name ?? session.user?.email}
                    </p>
                    <p className="text-xs uppercase text-muted-foreground">
                      {(session.user?.plan ?? "free").toString()}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/login" className={navLinkStyles}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
