import { CallbacksOptions } from "next-auth";
import Cognito from "next-auth/providers/cognito";

// https://mseeeen.msen.jp/nextauth-cognito-token-refresh/
// https://kelvinmwinuka.com/social-login-with-cognito-and-nextauth

const CognitoProvider = Cognito({
  clientId: process.env.COGNITO_CLIENT_ID!,
  clientSecret: process.env.COGNITO_CLIENT_SECRET!,
  issuer: process.env.COGNITO_ISSUER,
  idToken: true,
  authorization: {
    params: {
      scope: "openid email profile",
    },
  },
});
export default CognitoProvider;

export const CognitoCallbacks: Partial<CallbacksOptions> = {
  async signIn({ user, account, profile, email, credentials }) {
    return true;
  },
  // async redirect({ url, baseUrl }) { return baseUrl },
  async session({ session, token, user }) {
    // session.accessToken = token.accessToken;
    session.idToken = token.idToken;
    // session.refreshToken = token.refreshToken;
    return session;
  },
  // async jwt({ token, user, account, profile, isNewUser }) { return token }
  async jwt({ token, user, account, profile, isNewUser }) {
    if (account) {
      // account is provided upon the inital auth
      return {
        ...token,
        // accessToken: account.access_token,
        idToken: account.id_token,
        // refreshToken: account.refresh_token,
      };
    }
    return token;
  },
};
