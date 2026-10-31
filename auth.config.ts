import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },

  pages: {
    signIn: "/admin/login",
  },

  providers: [],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
session.user.id = token.id as string;
session.user.role = token.role as "ADMIN" | "EDITOR";
      }

      return session;
    },
  },
} satisfies NextAuthConfig;