"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey, getLocalStorage, setLocalStorage } from "@/lib/utils";
import { JWTError } from "@/lib/jwt";

import { Button } from "./ui/button";
import { EmergencyLoginModal } from "./EmergencyLoginModal";

export const PasskeyGate = () => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const phone = "09214966425";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendAdminOTP = useCallback(async () => {
    if (isSending) return false;
    setIsSending(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) return true;

      setError(data.error || "OTP send failed");
      return false;
    } catch (err) {
      console.error(err);
      setError("Error sending OTP");
      return false;
    } finally {
      setIsSending(false);
    }
  }, [phone]);

  useEffect(() => {
    if (!isClient) return;

    const checkGate = async () => {
      try {
        const encryptedKey = getLocalStorage("accessKey");
        if (!encryptedKey) {
          setShowGate(true);
          await sendAdminOTP();
          return;
        }

        const accessKey = decryptKey(encryptedKey);
        if (accessKey === "verified") {
          router.push("/admin/overview");
        } else {
          setShowGate(true);
          await sendAdminOTP();
        }
      } catch (err) {
        if (err instanceof JWTError) {
          console.error("JWT Error:", err.message);
          setLocalStorage("accessKey", "");
          setShowGate(true);
          await sendAdminOTP();
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred");
        }
      }
    };

    checkGate();
  }, [router, sendAdminOTP, isClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey || passkey.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: passkey }),
      });

      const data = await res.json();
      console.log("Verification response:", data);

      if (data.success) {
        try {
          const encryptedKey = await encryptKey("verified");
          setLocalStorage("accessKey", encryptedKey);
          console.log("Token stored, redirecting...");
          router.push("/admin/overview");
          router.refresh();
        } catch (tokenErr) {
          console.error("Error storing token:", tokenErr);
          setError("Error storing authentication token. Please try again.");
        }
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Error verifying OTP. Please try again.");
    }
  };

  if (!isClient || !showGate) return null;

  return (
    <div className="flex h-screen max-h-screen items-center justify-center px-6">
      <div className="remove-scrollbar container my-auto max-w-2xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-400">Admin OTP Access</h1>
          <EmergencyLoginModal />
        </div>
        <p className="text-sm text-gray-400">
          Enter the 6-digit OTP sent to your phone.
        </p>

        <InputOTP
          maxLength={6}
          value={passkey}
          onChange={(value) => setPasskey(value)}
        >
          <InputOTPGroup className="shad-otp">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot
                key={i}
                className="shad-otp-slot text-gray-400"
                index={i}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={sendAdminOTP}
            disabled={isSending}
            className="rounded-xl text-sm text-white"
          >
            {isSending ? "Resending..." : "Resend OTP"}
          </Button>

          <Button
            onClick={handleSubmit}
            className="shad-primary-btn rounded-xl px-6 py-2"
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
};
