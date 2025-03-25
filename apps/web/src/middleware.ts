import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;
  console.log("token", token);
  console.log("req.nextUrl.pathname", req.nextUrl.pathname);

  // Exclude the /signin page from the middleware check
  if (pathname === "/signin" || pathname.startsWith("/_next/")) {
    return NextResponse.next(); // Allow request to /signin to continue without token check
  }

  // If token is not found, redirect to signin page
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Token exists, allow request to continue
  return NextResponse.next();
}
