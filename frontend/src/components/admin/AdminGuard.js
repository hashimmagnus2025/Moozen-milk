"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { PageLoader } from "@/components/ui/Loading";

/** Redirects to /admin/login unless a valid admin session is present. */
export default function AdminGuard({ children }) {
  const { status } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "guest") router.replace("/admin/login");
  }, [status, router]);

  if (status !== "authenticated") {
    return <PageLoader />;
  }

  return children;
}
