"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import MobileDrawer from "@/components/admin/MobileDrawer";
import Topbar from "@/components/admin/Topbar";

/** Sidebar + topbar chrome wrapping every authenticated admin page. */
export default function AdminShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-0">
        <Topbar onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
