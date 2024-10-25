"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  signIn,
  signUp,
  verifyOTP,
  refreshToken,
  createClient,
} from "@/lib/auth-api";
import { deleteSession } from "@/lib/cookies";

export interface UserAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  isVerified: boolean;
  onboarding: boolean;
  imageUrl?: string;
  client?: IClient;
}
interface DecodedToken {
  user: UserAccount | null,
  role: string,
}

interface AuthContextType {
  user: UserAccount | null;
  profile: IClient | null;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  googleSignIn: (token: string) => Promise<void>; // Add this line
  signOut: () => void;
  createClient: (
    type: string,
    service: string,
    businessName: string
  ) => Promise<void>;
  persistUser: (account: any, client: any) => void;
  isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [profile, setProfile] = useState<IClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedProfile = localStorage.getItem("profile");
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
  
        if (storedUser && storedProfile) {
          const parsedUser = JSON.parse(storedUser);
          const parsedProfile = JSON.parse(storedProfile);
          console.log({ parsedUser });
          console.log({ parsedProfile });
  
          setUser(parsedUser);
          setProfile(parsedProfile);
          // Optionally set tokens if needed
          if (storedAccessToken) {
            // You might want to store it in a state or context
            document.cookie = `token=${storedAccessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
          }
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadAuthData();
  }, []);
  

  useEffect(() => {
    const refreshAccessToken = async () => {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedRefreshToken) {
        try {
          const { accessToken, refreshToken: newRefreshToken } =
            await refreshToken(storedRefreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          signOut();
        }
      }
    };

    const intervalId = setInterval(refreshAccessToken, 23 * 60 * 60 * 1000); // Refresh every 23 hours

    return () => clearInterval(intervalId);
  }, []);

  const signUpHandler = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    const { user } = await signUp(email, password, firstName, lastName, phone);
    setUser(user);
    router.push("/verify");
  };

  const verifyOTPHandler = async (email: string, otp: string) => {
    await verifyOTP(email, otp);
    router.push("/welcome");
  };

  const handlePersistUser = (account: any, client: any) => {
    setUser(account);
    setProfile(client);
    // router.push("/dashboard");
  };

  const signInHandler = async (email: string, password: string) => {
    const { user, client, accessToken, refreshToken } = await signIn(
      email,
      password
    );
    console.log({ user });

    if (user) {
      setUser(user);
      setProfile(client);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("profile", JSON.stringify(client));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // Set a cookie with the access token
      document.cookie = `token=${accessToken}; path=/; max-age=${
        60 * 60 * 24
      }; SameSite=Strict; Secure`;
      router.push("/dashboard");
    }
  };
  const googleSignInHandler = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to authenticate with Google');
      }
     
  
      const {  accessToken, refreshToken, isNewUser, onboading , user} = await response.json();
      handleUserSignIn(accessToken, refreshToken, isNewUser, onboading, user);
    } catch (error) {
      console.error("Google Sign-In error:", error);
      // Handle error (e.g., show a notification)
    }
  };
  
  const handleUserSignIn = async (
    accessToken: string,
    refreshToken: string,
    isNewUser : boolean,
    onboading :boolean,
    user : any,
  ) => {
    try {

     
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      console.log(decodedToken);

      
    const client = user.client;

  
    // Store user data and tokens
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  

    setUser(user);

    if (!user.onboading){
      document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
     
      router.push("/onboarding");
    }
    else {
  localStorage.setItem("client", JSON.stringify({ client }));
    // Store user data and tokens in cookies
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
    document.cookie = `client=${encodeURIComponent(JSON.stringify(user.client))}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict; Secure`;
    router.push("/dashboard");
    
    }
    } catch (error) {
      console.error("Error handling user sign-in:", error);
    }
  };
  


  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear the token cookie
    // deleteSession();

    router.push("/sign-in");
  };

  const createClientHandler = async (
    type: string,
    service: string,
    businessName: string
  ) => {
    if (user) {
      // Call your API to update the user's onboarding status

      const { user: updatedUser, client } = await createClient(
        user,
        type,
        service,
        businessName
      );
      setUser(updatedUser);
      setProfile(client);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("profile", JSON.stringify(client));

      router.push("/dashboard");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        createClient: createClientHandler,
        signUp: signUpHandler,
        verifyOTP: verifyOTPHandler,
        signIn: signInHandler,
        googleSignIn: googleSignInHandler, // Add this line
        signOut,
        isLoading,
        persistUser: handlePersistUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
