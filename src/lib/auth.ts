import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as { plan?: string }).plan ?? "free";
        token.email = user.email;
      }
      // Dev/testing override: force a specific email to Pro when set
      if (
        process.env.DEV_FORCE_PRO_EMAIL &&
        token.email === process.env.DEV_FORCE_PRO_EMAIL
      ) {
        token.plan = "pro";
      }
      // Refresh plan from the database to pick up changes without re-login
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { plan: true },
        });
        if (dbUser?.plan) {
          token.plan = dbUser.plan;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.plan = (token.plan as string) ?? "free";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
