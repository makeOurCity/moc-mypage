// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.SECRET, raw: false });
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  return res.status(200).json(token);
}
