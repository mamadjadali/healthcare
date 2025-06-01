"use client";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <main className="flex h-screen max-h-screen items-center justify-center px-6">
        {children}
      </main>
    </>
  );
};

export default Layout;
