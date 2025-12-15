import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { serverEnv } from "./data/env";
import { User } from "./types";
import { getAuthToken, validateUser } from "./lib/actions/auth";

const TOKEN_COOKIE_NAME = serverEnv.TOKEN_COOKIE_NAME || "access_token";

const protectedRoutes = ["/profile"];
const adminRoutes = ["/admin"];
const brandsRouts = ["/brands"];
const authRoutes = ["/login", "/signup"];
const publicRoutes = [
  "/",
  "/brands-list",
  "/about-us",
  "/contact-us",
  "/blog",
  "/search",
];

function isAdminUser(user: User): boolean {
  return user.role === "admin";
}
function isVendorsUser(user: User): boolean {
  return user.role === "vendor";
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isBrandsRoute = brandsRouts.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    ["/products"].some((route) => pathname.startsWith(route));

  const authToken = await getAuthToken();

  // Public route without auth → allow
  if (isPublicRoute && !authToken) {
    return NextResponse.next();
  }

  // Validate user if token exists
  let user: User | null = null;
  if (authToken) {
    user = await validateUser(authToken);
  }

  // Logged-in users visiting /login or /signup → redirect
  if (isAuthRoute && user) {
    let redirectTo = "/";

    if (isAdminUser(user)) {
      redirectTo = "/admin/dashboard";
    }

    if (isVendorsUser(user)) {
      redirectTo = "/brands/dashboard";
    }

    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Protected/admin routes require authentication
  if ((isProtectedRoute || isAdminRoute || isBrandsRoute) && !user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.nextUrl.pathname);

    const response = NextResponse.redirect(loginUrl);

    // Clear invalid token
    if (authToken) {
      response.cookies.delete(TOKEN_COOKIE_NAME);
    }

    return response;
  }

  // User exists but not an admin → prevent admin access
  if (user && isAdminRoute && !isAdminUser(user)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // User exists but not an brands → prevent brands access
  if (user && isBrandsRoute && !isVendorsUser(user)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
