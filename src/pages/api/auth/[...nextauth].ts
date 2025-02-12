import KongProvider, { KongCallbacks } from "../../../providers/KongProvider";
import NextAuth, { type NextAuthOptions } from "next-auth";

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
  providers: [KongProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: KongCallbacks,
};

export default NextAuth(authOptions);
