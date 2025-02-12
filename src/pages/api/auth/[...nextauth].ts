import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Axios from "axios";
import https from "https";

interface KongProfile {
  sub: string;
  name?: string;
  email?: string;
}

const axios = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
  },
  providers: [
    // ex:https://zenn.dev/bosushi/articles/cff6ac4071f6c6
    CredentialsProvider({
      name: "credentials",
      credentials: {
        client_id: {
          label: "Client ID",
          placeholder: "xxxxx-xxxxx-xxxxx-xxxxx",
        },
        client_secret: { label: "Client Secret", type: "password" },
      },

      async authorize(credentials) {
        // console.log(credentials);
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        if (!credentials.client_id || !credentials.client_secret) {
          throw new Error("Missing credentials");
        }

        try {
          const params = new URLSearchParams();
          params.append("grant_type", "client_credentials");
          params.append("client_id", credentials.client_id);
          params.append("client_secret", credentials.client_secret);

          // try {
          const tokenUrl = `${process.env.KONG_URL}/oauth2/token`;
          // console.log(tokenUrl, params);
          const resp = await axios.post(tokenUrl, params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          // console.log(resp.data);

          return {
            id: resp.data.state,
            idToken: resp.data.access_token.trim(),
          };
        } catch (error) {
          throw new Error("Invalid credentials");
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") token.name = session?.user?.name;
      return {
        ...user,
        ...token,
      };
    },
    async session({ user, session, token }) {
      session.user = user;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
