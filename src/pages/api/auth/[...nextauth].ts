import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CognitoProvider, { CognitoProfile } from "next-auth/providers/cognito";
import { OAuthConfig, Provider } from "next-auth/providers";
import { Issuer } from "openid-client";

import axios from "axios";
import { JWT, getToken} from "next-auth/jwt";
// import EmailProvider from "next-auth/providers/email"
// import AppleProvider from "next-auth/providers/apple"


const providers: Provider[] = [];
let cognitoProvider: OAuthConfig<CognitoProfile> | undefined = undefined;

// https://mseeeen.msen.jp/nextauth-cognito-token-refresh/
// https://kelvinmwinuka.com/social-login-with-cognito-and-nextauth
if (process.env.COGNITO_CLIENT_ID && process.env.COGNITO_CLIENT_SECRET) {
  cognitoProvider = CognitoProvider({
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
  providers.push(cognitoProvider);
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers,
  // providers: [
  // CognitoProvider({
  //   clientId: process.env.COGNITO_CLIENT_ID!,
  //   clientSecret: process.env.COGNITO_CLIENT_SECRET!,
  //   issuer: process.env.COGNITO_ISSUER,
  // })
  // EmailProvider({
  //   server: process.env.EMAIL_SERVER,
  //   from: process.env.EMAIL_FROM,
  // }),
  // AppleProvider({
  //   clientId: process.env.APPLE_ID,
  //   clientSecret: {
  //     appleId: process.env.APPLE_ID,
  //     teamId: process.env.APPLE_TEAM_ID,
  //     privateKey: process.env.APPLE_PRIVATE_KEY,
  //     keyId: process.env.APPLE_KEY_ID,
  //   },
  // }),
  // Auth0Provider({
  //   clientId: process.env.AUTH0_ID,
  //   clientSecret: process.env.AUTH0_SECRET,
  //   // @ts-ignore
  //   domain: process.env.AUTH0_DOMAIN,
  // }),
  // FacebookProvider({
  //   clientId: process.env.FACEBOOK_ID,
  //   clientSecret: process.env.FACEBOOK_SECRET,
  // }),
  // GithubProvider({
  //   clientId: process.env.GITHUB_ID,
  //   clientSecret: process.env.GITHUB_SECRET,
  //   // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
  //   // @ts-ignore
  //   scope: "read:user",
  // }),
  // GoogleProvider({
  //   clientId: process.env.GOOGLE_ID,
  //   clientSecret: process.env.GOOGLE_SECRET,
  // }),
  // TwitterProvider({
  //   clientId: process.env.TWITTER_ID,
  //   clientSecret: process.env.TWITTER_SECRET,
  // }),
  // ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.idToken = token.idToken;
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        // account is provided upon the inital auth
        return {
          ...token,
          error: undefined,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? Date.now() + account.expires_at * 1000 : Date.now(),
          user,
        };
      }
      
      if (Date.now() < (token.accessTokenExpires ?? 0) * 1000) {
        console.debug(`Token available (expires at: ${token.accessTokenExpires})`);
        return token;
      }
      console.debug(`Token expired at ${token.accessTokenExpires}. Trying to refresh...`);
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
  },
  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development" ? true : false,
});


async function refreshAccessToken(token: any): Promise<JWT> {
  if (cognitoProvider) {
    try {
      const client_id = cognitoProvider.options?.clientId ?? "";
      const client_secret = cognitoProvider.options?.clientSecret ?? "";
      const issuer = await Issuer.discover(cognitoProvider.wellKnown!);
      const token_endpoint = issuer.metadata.token_endpoint ?? "";
      const basicAuthParams = `${client_id}:${client_secret}`;
      const basicAuth = Buffer.from(basicAuthParams).toString("base64");
      const params = new URLSearchParams({
        client_id,
        client_secret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });
      // Refresh token
      const response = await fetch(token_endpoint, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        method: "POST",
        body: params.toString(),
      });
      const newTokens = await response.json();
      if (!response.ok) {
        throw newTokens;
      }
      // Next expiration period
      const accessTokenExpires =
        Math.floor(Date.now() / 1000) + newTokens.expires_in;
      console.debug(`Token refreshed (expires at: ${accessTokenExpires})`);
      // Return new token set
      return {
        ...token,
        error: undefined,
        accessToken: newTokens.access_token,
        accessTokenExpires,
      };
    } catch (error) {
      console.log(error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }

  return {
    ...token,
    error: "RefreshAccessTokenError",
  }
}