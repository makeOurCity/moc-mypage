import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { getToken } from "next-auth/jwt";

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
  // const session = await getServerSession();
  const token = await getToken({ req, secret: process.env.SECRET, raw: false });
  const proxy = httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_ORION_BASE_URL,
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${token?.idToken}`,
    },
    pathRewrite: [
      {
        patternStr: "^/api/orion",
        replaceStr: "",
      },
    ],
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return proxy;
};

export default OrionProxy;
