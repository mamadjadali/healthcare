"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { setLocalStorage } from "@/lib/utils";
import { BadgeCheckIcon, LogOut } from "lucide-react";
import { SettingsSheet } from "@/components/SettingsSheet";
import { TimeSettingsSheet } from "@/components/TimeSettingsSheet";
import { Badge } from "./ui/badge";

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
        <button className="hidden md:flex relative h-6 overflow-hidden rounded-lg p-[1px] focus:outline-none">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-transparent px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Dr.Maryam Ranjbar
        </span>
      </button>
        <Badge
          variant="secondary"
          className="hidden md:flex bg-[#155dfc] text-white dark:bg-blue-600"
        >
          <span className="relative flex size-3 mr-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-slate-300"></span>
            </span>
           v0.1.0 – Mercury
        </Badge>
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
