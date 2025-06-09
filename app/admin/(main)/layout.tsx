import type { Metadata } from "next";
import { Toaster } from "sonner";

import { AdminHeader } from "@/components/AdminHeader";

export const metadata: Metadata = {
  title: "Doxset",
  description:
    "A healthcare management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <AdminHeader />
      <main className="min-h-screen bg-[#09090b]">
        {children}
      </main>
    </>
  );
}
