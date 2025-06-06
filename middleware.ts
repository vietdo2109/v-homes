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

  if (!token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Handle case: logged in user access login page
  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle case: user has not logged in yet
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Handle case: normal user try to access admin dashboard pages
  const decodedToken = decodeJwt(token);

  if (!decodedToken.admin) {
    return NextResponse.redirect(new URL("/", req.url));
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard", "/admin-dashboard/:path*", "/login"],
};
