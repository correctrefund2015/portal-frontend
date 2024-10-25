import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  onboarding: boolean;
  isVerified: boolean;
  client: IClient;
}

export interface DecodedToken {
  exp: number;
  user: User;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const { user, accessToken, refreshToken } = await response.json();
  setTokens(accessToken, refreshToken);
  return user;
}

export async function verifyOtp(email: string, otp: string) {
  const response = await fetch(`${API_URL}/auth/otp-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    throw new Error("OTP verification failed");
  }

  const { user, accessToken, refreshToken } = await response.json();
  setTokens(accessToken, refreshToken);
  return user;
}

export async function googleAuth() {
  window.location.href = `${API_URL}/auth/google`;
}

export async function handleGoogleCallback(code: string) {
  const response = await fetch(`${API_URL}/auth/google/callback?code=${code}`);

  if (!response.ok) {
    throw new Error("Google authentication failed");
  }

  const { user, accessToken, refreshToken } = await response.json();
  setTokens(accessToken, refreshToken);
  return user;
}

export function setTokens(accessToken: string, refreshToken: string) {
  cookies().set("accessToken", accessToken, { httpOnly: true, secure: true });
  cookies().set("refreshToken", refreshToken, { httpOnly: true, secure: true });
}

export async function logout() {
  cookies().delete("user");
  cookies().delete("client");
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  // redirect("/sign-in");
}

export async function getUser(): Promise<User | null> {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  // console.log({ refreshToken });

  if (!accessToken) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(accessToken);
    // console.log({ decoded });

    // if (Date.now() >= decoded.exp * 1000) {
    //   // Token expired, try to refresh
    //   const newUser = await refreshAccessToken();
    //   return newUser;
    // }
    return decoded.user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export async function refreshAccessToken(
  googleRefresh?: string
): Promise<User | null> {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken || !googleRefresh) return null;

  const token = googleRefresh ? googleRefresh : refreshToken;
  console.log("refresh token ===>", { token });

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    console.log({ response });

    const {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    } = await response.json();
    setTokens(accessToken, newRefreshToken);
    return user;
  } catch (error) {
    console.error("Error refreshing token:", error);
    logout();
    return null;
  }
}
