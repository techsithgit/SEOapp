"use client";

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1200px] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-foreground">
            Sign in to Serpify
          </CardTitle>
          <CardDescription>
            Use Google to continue. No passwords required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full gap-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <LogIn className="h-4 w-4" />
            Continue with Google
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link className="underline" href="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
