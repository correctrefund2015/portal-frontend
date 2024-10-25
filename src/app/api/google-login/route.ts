import { NextRequest, NextResponse } from "next/server";
import { DecodedToken, refreshAccessToken } from "@/lib/session";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    console.log('Processing Google login callback...');

    // Extract the search parameters from the request URL
    const { searchParams } = new URL(req.url);
    const accessToken = searchParams.get("redirect");
    const refreshToken = searchParams.get("token");

    // Check for the presence of the tokens
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Decode the access token
    const { user } = jwtDecode<DecodedToken>(accessToken);

    // Set user cookie
    cookies().set("user", JSON.stringify(user));
    console.log('User decoded from token:', user);

    // Refresh access token
    await refreshAccessToken(refreshToken);

    // localStorage.setItem("user", JSON.stringify(user));

    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);

    // Determine the route based on user status
    let route = "/dashboard"; // Default route

    if (!user.isVerified && !user.onboarding) {
      route = "/welcome";
    } else if (user.isVerified && !user.onboarding) {
      route = "/onboarding";
    }

    // Redirect the user to the appropriate route
    return NextResponse.redirect(new URL(route, req.url));
  } catch (error: any) {
    console.error("Error during Google login:", error);
    return NextResponse.redirect(new URL("/error", req.url)); // Redirect to an error page
  }
}
