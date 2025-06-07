"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { encryptKey, setLocalStorage } from "@/lib/utils";

export const EmergencyLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmergencyLogin = async () => {
    try {
      const res = await fetch("/api/verify-emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        const encryptedKey = await encryptKey("verified");
        setLocalStorage("accessKey", encryptedKey);
        router.push("/admin/overview");
        router.refresh();
      } else {
        setError("Invalid emergency token");
      }
    } catch (err) {
      console.error("Emergency login error:", err);
      setError("Error verifying emergency token");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-gray-400 hover:text-white"
        >
          Emergency Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Emergency Access</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              type="password"
              placeholder="Enter emergency token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="text-gray-400"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            onClick={handleEmergencyLogin}
            className="shad-primary-btn"
          >
            Verify Emergency Token
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 