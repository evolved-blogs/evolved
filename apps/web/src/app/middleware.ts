import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = localStorage.getItem("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
