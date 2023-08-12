import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.cookies.has("token")) {
    const url = req.nextUrl.clone();
    url.pathname = "/signup";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
