import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata = {
  title: "Admin — Moozen",
  robots: { index: false, follow: false },
};

/** Root layout for everything under /admin — auth context + its own toast stack. */
export default function AdminRootLayout({ children }) {
  return (
    <ToastProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </ToastProvider>
  );
}
