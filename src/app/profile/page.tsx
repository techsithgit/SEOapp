"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center px-4 py-12">
        <p className="text-sm text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login required</CardTitle>
            <CardDescription>
              Please sign in to view your profile and plan details.
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

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1200px] items-start justify-center px-4 py-10">
      <Card className="w-full max-w-lg shadow-sm">
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
          <CardDescription>
            View your account details and current plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/60 px-4 py-3">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-base font-medium text-foreground">
              {session.user?.name ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border bg-muted/60 px-4 py-3">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-base font-medium text-foreground">
              {session.user?.email ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border bg-muted/60 px-4 py-3">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-base font-semibold uppercase text-foreground">
              {(session.user?.plan ?? "free").toString()}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="outline">
              <Link href="/pricing">Manage plan</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
