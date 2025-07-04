import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // default running on any route executing server actions (POST) >> avoid
  if (req.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const { pathname } = req.nextUrl;
  if (
    !token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/property-search") ||
      pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.next();
  }

  // Handle case: logged in user access login/register page
  if (
    token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle case: user has not logged in yet
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle case: normal user try to access admin dashboard pages
  const decodedToken = decodeJwt(token);

  // Check if the token will be expired winthin 5 minutes or not
  if (decodedToken.exp && (decodedToken.exp - 55 * 60) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(
          req.nextUrl.pathname
        )}`,
        req.url
      )
    );
  }

  if (!decodedToken.admin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (decodedToken.admin && pathname.startsWith("/account/favourites")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/account",
    "/account/favourites",
    "/property-search",
    "/forgot-password",
  ],
};
