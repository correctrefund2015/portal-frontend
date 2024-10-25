import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    error?: "RefreshAccessTokenError";
  }
}
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
  interface User {
    onboarding: boolean;
    isVerified: boolean;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
