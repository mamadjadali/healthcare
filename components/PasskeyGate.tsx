"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyGate = () => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const router = useRouter();
  const phone = "09214966425";

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
  }, [phone]); // Removed isSending from dependencies

  useEffect(() => {
    const checkGate = async () => {
      const encryptedKey = localStorage.getItem("accessKey");
      const accessKey = encryptedKey && decryptKey(encryptedKey);

      if (accessKey === "verified") {
        router.push("/admin/overview");
      } else {
        setShowGate(true);
        await sendAdminOTP(); // Only called once on mount
      }
    };

    checkGate();
  }, [router]); // Removed sendAdminOTP from dependencies

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
      if (data.success) {
        const encryptedKey = encryptKey("verified");
        localStorage.setItem("accessKey", encryptedKey);
        router.push("/admin/overview");
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Error verifying OTP");
    }
  };

  if (!showGate) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin OTP Access</h1>
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
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
              <InputOTPSlot key={i} className="shad-otp-slot" index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            onClick={sendAdminOTP}
            disabled={isSending}
            className="text-sm text-blue-500 hover:underline"
          >
            {isSending ? "Resending..." : "Resend OTP"}
          </button>

          <button
            onClick={handleSubmit}
            className="shad-primary-btn rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};
