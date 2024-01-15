import { Environments } from '@/libs/environments';
import TextLogo from '@/libs/textLogo';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const s = await TextLogo(Environments.getMocHeaderLogoText() || "MOC");

  res.status(200).setHeader("Content-Type", "image/svg+xml");
  res.write(s);
  res.end();
}
