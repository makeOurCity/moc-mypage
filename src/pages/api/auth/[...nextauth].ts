import NextAuth, { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    {
      id: "kong", // プロバイダーのID
      name: "Kong", // プロバイダーの名前
      type: "oauth", // プロバイダーのタイプ
      clientId: process.env.KONG_CLIENT_ID, // クライアントID
      clientSecret: process.env.KONG_CLIENT_SECRET, // クライアントシークレット
      authorization: {
        url: `${process.env.KONG_URL}/oauth2/authorize`, // 認証エンドポイント
        params: { scope: "email profile" }, // スコープ
      },
      token: `${process.env.KONG_URL}/oauth2/token`, // トークンエンドポイント
      userinfo: `${process.env.KONG_URL}/oauth2/userinfo`, // ユーザー情報エンドポイント
      profile: (profile: any) => {
        return {
          id: profile.sub, // ユーザーID
          name: profile.name, // ユーザー名
          email: profile.email, // メールアドレス
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
  secret: process.env.NEXTAUTH_SECRET, // NextAuthのシークレットキー
};

export default NextAuth(authOptions);
