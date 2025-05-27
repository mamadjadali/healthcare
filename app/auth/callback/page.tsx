"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { account } from "@/lib/appwrite-client";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("useEffect triggered with searchParams:", searchParams.toString());
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
      router.push("/login?error=missingParams");
      return;
    }

    console.log("Checking for existing session...");
    // Check for existing session
    account
      .get()
      .then((currentUser) => {
        console.log("account.get response:", currentUser);
        // If a session exists, redirect to onboarding
        if (currentUser.$id === userId) {
          console.log("Existing session found for user:", userId);
          router.push(`/patients/${userId}/onboarding`);
        }
      })
      .catch(() => {
        console.log("No existing session, creating new one...");
        // No existing session, proceed with creating a new one
        account
          .createSession(userId, secret)
          .then(() => {
            console.log("Session created successfully for user:", userId);
            router.push(`/patients/${userId}/onboarding`);
          })
          .catch((error) => {
            console.error("Session creation failed:", {
              message: error.message,
              code: error.code,
              type: error.type,
            });
            if (error.type === "user_session_already_exists") {
              // Handle existing session case
              console.log("Session already exists, redirecting...");
              router.push(`/patients/${userId}/onboarding`);
            } else {
              router.push(`/login?error=sessionFailed&code=${error.code}&type=${error.type}`);
            }
          });
      });
  }, [searchParams, router]);

  return <p>Logging you in, please wait...</p>;
}