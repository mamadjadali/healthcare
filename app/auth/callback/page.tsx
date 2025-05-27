"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { account } from "@/lib/appwrite-client";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
      router.push("/login?error=missingParams");
      return;
    }

    account.createSession(userId, secret)
      .then(() => {
        router.push(`/patients/${userId}/dashboard`);
      })
      .catch((error) => {
        console.error("Session creation failed:", error);
        router.push("/login?error=sessionFailed");
      });
  }, [searchParams, router]);

  return <p>Logging you in, please wait...</p>;
}