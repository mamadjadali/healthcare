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
import { OctagonAlert, Loader2 } from "lucide-react";

export const EmergencyLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmergencyLogin = async () => {
    setIsLoading(true);
    setError("");
    
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-gray-400"
        >
          <OctagonAlert className="text-red-500 mx-2" />
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
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            onClick={handleEmergencyLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Emergency Token"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 