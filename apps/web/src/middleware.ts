import { NextRequest, NextResponse } from "next/server";
import { authenticatedRoutes } from "@src/routes";
import { Urls } from "./enum";

const middleware = async (req: NextRequest) => {
  const pathName = req.nextUrl.pathname;
  const isPublicPath = pathName === "/";
  const token = req.cookies.get("token");

  console.log("token", token);
  const unauthenticated = authenticatedRoutes.some(
    (route) => route === pathName
  );

  console.log("Middleware unauthenticated:", unauthenticated);
  if (!token && unauthenticated) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL(Urls.Login, req.url));
  } else {
    return NextResponse.next();
  }
};

export default middleware;

export const config = {
  matcher: [
    "/((?!api|webmanifest.webmanifest|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)",
  ],
};
