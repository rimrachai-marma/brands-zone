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
const publicRoutes = ["/", "/about-us", "/contact-us", "/blog", "/search",'/brands-list','/brands-list/*'];
const publicRoutePrefixes = [
  "/brands-list",
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
  const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
  );
  const isBrandsRoute = brandsRouts.some((route) =>
      pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  const isPublicRoute =
      publicRoutes.includes(pathname) ||
      publicRoutePrefixes.some((route) => pathname.startsWith(route));

  // ✅ PUBLIC ROUTES → ALWAYS ALLOW
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const authToken = await getAuthToken();

  let user: User | null = null;
  if (authToken) {
    user = await validateUser(authToken);
  }

  // Logged-in user visiting login/signup
  if (isAuthRoute && user) {
    let redirectTo = "/";

    if (isAdminUser(user)) redirectTo = "/admin/dashboard";
    if (isVendorsUser(user)) redirectTo = "/brands/dashboard";

    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Protected routes require auth
  if ((isProtectedRoute || isAdminRoute || isBrandsRoute) && !user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);
    if (authToken) response.cookies.delete(TOKEN_COOKIE_NAME);

    return response;
  }

  // Role protection
  if (user && isAdminRoute && !isAdminUser(user)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

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
