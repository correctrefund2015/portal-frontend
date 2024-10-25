import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/session";

// Define protected and public routes
const protectedRoutes = ["/", "/welcome", "/dashboard", "/onboarding"];
const authRoutes = ["/sign-in", "/sign-up", "/verify", "/google/callback"];
export async function middleware(request: NextRequest) {
  
  const user = await getUser();
  const path = request.nextUrl.pathname;

  console.log("user", user);

  // Redirect from root "/" to another page, e.g., "/dashboard" or "/welcome"
  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // or another route like "/welcome"
  }

  const isAuthRoute = authRoutes.includes(path);

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user has completed onboarding and tries to access the onboarding page, redirect them
  if (user && user.onboarding && path === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // or another route
  }

  if (user && !user.onboarding && path !== "/onboarding") {
    console.log("onboarding =>>>>>>>>>.....");

    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
