"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { ADMIN_NAV } from "@/lib/adminNav";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { cn } from "@/lib/utils";

export function SidebarContent({ onNavigate }) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();

  return (
    <div className="flex h-full flex-col bg-forest-dark text-cream">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="font-display text-2xl italic">Moozen</span>
        <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-gold">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {ADMIN_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-forest-dark" : "text-cream/70 hover:bg-white/5 hover:text-cream"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="admin-nav-active"
                  className="absolute inset-0 rounded-xl bg-gold"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Icon className="relative z-10 size-4.5" strokeWidth={1.75} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold uppercase">
            {admin?.name?.[0] ?? "A"}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-cream">{admin?.name ?? "Admin"}</p>
            <p className="truncate text-xs text-cream/50">{admin?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
        >
          <LogOut className="size-4.5" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </div>
  );
}

/** Fixed sidebar for desktop. */
export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="fixed inset-y-0 w-64">
        <SidebarContent />
      </div>
    </aside>
  );
}
