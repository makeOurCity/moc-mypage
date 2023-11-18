import { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") throw new Error("Method is not allowed");

    const { key } = req.body;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      ACL: "public-read",
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 300 });

    res.status(200).json({ signedUrl, objectUrl: signedUrl.split("?")[0] });
  } catch (error: any) {
    res.status(500).json({ error: error });
  }
}
