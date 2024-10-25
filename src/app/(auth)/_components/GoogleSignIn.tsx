"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Extend the window object to include google
declare global {
  interface Window {
    google: any; // You can refine 'any' to specific types later if needed
  }
}

const GoogleSignIn: React.FC = () => {
  const { googleSignIn } = useAuth(); // Access googleSignIn from AuthContext

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      // Safely access google from the window object
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: handleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv") as HTMLElement,
          { theme: "outline", size: "large" }
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.referrerPolicy = "strict-origin-when-cross-origin";
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCallbackResponse = async (response: any) => {
    // Send the token to your backend for verification
    await googleSignIn(response.credential); // Call googleSignIn from context
  };

  return <div id="signInDiv"></div>;
};

export default GoogleSignIn;
