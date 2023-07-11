import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import { sendVerificationRequest } from "../../../utils/send-verification-request";

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      name: "email",
      server: "",
      from: "hello@useplunk.com",
      sendVerificationRequest,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_SECRET,
  }),
  callbacks: {
    async session({ session, user }: any) {
      const payload = {
        aud: "authenticated",
        exp: Math.floor(new Date(session.expires).getTime() / 1000),
        sub: user.id,
        email: user.email,
        role: "authenticated",
      };
      session.supabaseAccessToken = jwt.sign(
        payload,
        process.env.SIGNING_SECRET
      );
      return session;
    },
  },
};

export default NextAuth(authOptions);