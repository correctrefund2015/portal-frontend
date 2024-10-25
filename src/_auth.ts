import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/auth";
import { loginRequest } from "./lib/auth";
import { JWT } from "next-auth/jwt";
import NextAuth, { User } from "next-auth";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log("==================== start refreshing =================");
  // console.log("==================== start refreshing =================");

  try {
    const response = await fetch(`${process.env.HOST}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    // console.log("new access token =>>>", refreshedTokens.accessToken);

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      expiresAt: Date.now() + 3600 * 1000, // Update with your token expiration time
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return { error: "Invalid fields!" };
          }

          const { email, password } = validatedFields.data;

          const response: any = await loginRequest(email, password);

          if (response.user) {
            return response.user;
          } else {
            // If the backend returns a specific error message, you can use it
            throw new Error(response.error || "Invalid email or password");
          }
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("An error occurred during login. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    // authorized: async ({ request: { nextUrl }, auth }) => {

    //   return !!auth;
    // },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User | undefined;
      account: any;
    }) {
      // console.log("jwt====>", { token, user, account });

      if (user) {
        token.sub = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.onboarding = user.onboarding;
        token.expiresAt = Date.now() + 3600 * 1000; //  3600 * 1000 hour from now
        return token;
      }

      // On subsequent calls, token.exp is defined and token.accessToken exists
      if (Date.now() < token.expiresAt) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: JWT;
      user: User;
    }) {
      // console.log("session===>", { token, session });
      session.user.id = token.sub;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role;
      session.user.isVerified = token.isVerified;
      session.user.onboarding = token.onboarding;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
});
