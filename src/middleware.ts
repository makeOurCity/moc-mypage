import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt";

// https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/next/middleware.ts
export async function middleware(req: NextRequest) {

  const token = await getToken({
    req,
    secret: process.env.SECRET
  });

  if (token)
    return NextResponse.next();
  else
    return NextResponse.rewrite(
      new URL("/401", req.url),
      { status: 401 }
    );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/fiware/:path*",
}
