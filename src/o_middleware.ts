// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  const client = request.cookies.get("client")?.value;
  const { pathname } = request.nextUrl;
console.log('hi');
  // console.log({ token });

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // Define authentication routes
  const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/verify",
    "/onboarding",
    "/welcome",
  ];

  if (token) {
    // Check if token exists
    // If user and client exist, redirect to dashboard
    if (user && client) {
      if (!pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    // If user or client is missing, redirect to onboarding
    else {
      if (!pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }
  // If no token, handle protected and auth routes
  else {
    console.log('else st')
    // Redirect to sign-in for protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

async function verifyToken(token: string) {
  console.log("verifying token======>");

  // Implement token verification logic here
  // This could involve sending a request to your backend to verify the token
  // and return the user data
  // For example:
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return response.json();
}

// Optionally, you can define specific paths for the middleware to run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
    "/verify",
    "/onboarding",
    "/welcome",
  ],
};
