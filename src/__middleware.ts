import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, getSession } from "@/lib/cookies";

// Define protected and public routes
const protectedRoutes = ["/", "/welcome", "/dashboard", "/onboarding"];
const publicRoutes = ["/sign-in", "/sign-up", "/verify"];
console.log('just')
// Helper function to get a value from cookies
function getCookieValue(
  request: NextRequest,
  name: string
): string | undefined {
  return request.cookies.get(name)?.value;
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookie = getCookieValue(req, "session");
  const session = await decrypt(cookie);
  console.log({ session });

  // Check onboarding status
  const onboardingStatus = cookies().get("onboarding-status")?.value;
  const onboardingComplete = onboardingStatus === "completed";

  // Redirect logic
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isPublicRoute && session?.userId) {
    if (onboardingComplete) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // Redirect to onboarding if not completed
  if (session?.userId && !onboardingComplete && path !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Redirect to dashboard if onboarding is complete and trying to access onboarding page
  if (session?.userId && onboardingComplete && path === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
