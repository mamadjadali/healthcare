"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { setLocalStorage } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { SettingsSheet } from "@/components/SettingsSheet";
import { TimeSettingsSheet } from "@/components/TimeSettingsSheet";

export const AdminHeader = () => {
  const router = useRouter();

  const handleSignOut = () => {
    setLocalStorage("accessKey", "");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-7xl">
      <header className="admin-header mb-10 mt-6 border border-gray-400">
        <Link href="/admin/overview" className="cursor-pointer">
          <Image
            src="/assets/images/logo-typo.svg"
            height={81}
            width={361}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SettingsSheet />
          <TimeSettingsSheet />
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-sm text-gray-400"
          >
            <LogOut />
          </Button>
        </div>
      </header>
    </div>
  );
};
