import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import "../../globals.css";

import { AdminHeader } from "@/components/AdminHeader";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-[#09090b] font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <AdminHeader />
        {children}
      </body>
    </html>
  );
}
