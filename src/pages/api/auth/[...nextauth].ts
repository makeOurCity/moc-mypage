import KongProvider, { KongCallbacks } from "../../../providers/KongProvider";
import NextAuth, { type NextAuthOptions } from "next-auth";

const providers: Provider[] = [];

if (process.env.COGNITO_CLIENT_ID && process.env.COGNITO_CLIENT_SECRET) {
  providers.push(
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER,
      idToken: true,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    })
  );
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
  providers: [KongProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: KongCallbacks,
};

export default NextAuth(authOptions);
