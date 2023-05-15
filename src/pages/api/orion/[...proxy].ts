import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware, { rewritePath } from "next-http-proxy-middleware";
import https from "https";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

// ファイルのアップロードなどでmultipart/form-dataを使用するときの設定
export const config = {
  api: {
    bodyParser: false,
  },
};

const OrionProxy = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  const session = await getSession();
  console.log("session", session);
  const token = await getToken({ req, secret: process.env.SECRET, raw: true });
  console.log("token------", token);
  const proxy = httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_ORION_BASE_URL,
    changeOrigin: true,
    headers: {
      Authorization: token,
    },
    pathRewrite: [
      {
        patternStr: "^/api/orion",
        replaceStr: "",
      },
    ],
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  return proxy;
};

export default OrionProxy;
