import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";

interface KongProfile {
  sub: string;
  name?: string;
  email?: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    {
      id: "kong",
      name: "Kong",
      type: "oauth",
      clientId: process.env.KONG_CLIENT_ID,
      clientSecret: process.env.KONG_CLIENT_SECRET,
      authorization: {
        url: `${process.env.KONG_URL}/oauth2/authorize`,
        params: {
          scope: "email profile",
          response_type: "code",
          client_id: process.env.KONG_CLIENT_ID,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/kong`,
        },
      },
      token: {
        url: `${process.env.KONG_URL}/oauth2/token`,
      },
      userinfo: `${process.env.KONG_URL}/oauth2/userinfo`,
      profile: (profile: KongProfile) => {
        return {
          id: profile.sub,
          name: profile.name || "Unknown",
          email: profile.email || "",
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
