import KongProvider, { KongCallbacks } from "../../../providers/KongProvider";
import NextAuth, { CallbacksOptions, type NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import CognitoProvider, { CognitoCallbacks } from "@/providers/CognitoProvider";

const providers: Provider[] = [];
let callbacks: Partial<CallbacksOptions> = {};

if (process.env.COGNITO_CLIENT_ID && process.env.COGNITO_CLIENT_SECRET) {
  providers.push(CognitoProvider);
  callbacks = CognitoCallbacks;
} else {
  providers.push(KongProvider);
  callbacks = KongCallbacks;
}

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
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks,
};

export default NextAuth(authOptions);
