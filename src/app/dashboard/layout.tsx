"use client";

import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import { Authenticated } from "convex/react";
import { NavigationProvider } from "@/lib/context/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex h-screen">
        {/* 
        TODO: Implement Sidebar component
        <Authenticated>
          <Sidebar />
        </Authenticated> */}

        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}
