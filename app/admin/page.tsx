"use client";

import { PasskeyGate } from "@/components/PasskeyGate";

const AdminPage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <PasskeyGate />
    </main>
  );
};

export default AdminPage;
