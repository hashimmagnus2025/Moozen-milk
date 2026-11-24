"use client";

import { Menu, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-cream-dark/70 bg-cream/90 px-4 py-3.5 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex size-9 items-center justify-center rounded-full text-forest-dark hover:bg-cream-deep lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <span className="font-display text-lg italic text-forest-dark lg:hidden">Moozen Admin</span>

      <Link
        href="/"
        target="_blank"
        className="ml-auto flex items-center gap-1.5 rounded-full border border-cream-dark px-3.5 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-forest/40 hover:text-forest-dark"
      >
        View site
        <ExternalLink className="size-3" />
      </Link>
    </header>
  );
}
