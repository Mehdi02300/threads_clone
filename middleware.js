import { hasCookie } from "cookies-next/server";
import { NextResponse } from "next/server";

export async function middleware(req) {
  let isAuthenticated = false;
  const res = NextResponse.next();

  // Check if is invited user
  const exist = await hasCookie("guest", { req, res });
  if (exist) {
    isAuthenticated = true;
  }

  // Check if connected

  // Check if isAuthenticated
  if (!isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/"],
};
