"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const phone = "09212513436";

  const sendAdminOTP = async () => {
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("OTP sent to admin phone");
      } else {
        console.error("Failed to send OTP:", data.error);
        setError(data.error === 'Active OTP already exists. Please wait.' 
          ? "An OTP has already been sent. Please check your phone or try again later."
          : "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Error sending OTP. Please try again.");
    }
  };

  

  useEffect(() => {
    const encryptedKey = typeof window !== "undefined" ? localStorage.getItem("accessKey") : null;
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey === "verified") {
      setOpen(false);
      router.push("/admin");
    } else if (path) {
      setOpen(true);
      sendAdminOTP();
    }
  }, [path]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!passkey || passkey.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, code: passkey }),
      });
      const data = await res.json();

      if (data.success) {
        // Store a generic token to indicate successful verification
        const encryptedKey = encryptKey("verified");
        localStorage.setItem("accessKey", encryptedKey);
        setOpen(false);
        router.push("/admin");
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Error verifying OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    setError("");
    setPasskey("");
    await sendAdminOTP();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
          <button
            onClick={resendOTP}
            className="text-14-regular mt-4 flex justify-center text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Verify OTP
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
