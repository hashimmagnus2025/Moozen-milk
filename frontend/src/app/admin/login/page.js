"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useToast } from "@/components/ui/Toast";
import { Spinner } from "@/components/ui/Loading";
import { fadeUp, staggerContainer } from "@/lib/animations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminLoginPage() {
  const { login, status } = useAdminAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.replace("/admin/dashboard");
  }, [status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!values.password) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(values.email.trim(), values.password);
      toast({ variant: "success", title: "Welcome back" });
      router.replace("/admin/dashboard");
    } catch (err) {
      toast({ variant: "error", title: "Login failed", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest-dark px-4">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-10%] size-[28rem] rounded-full bg-moss/25 blur-[110px]" />
        <div className="absolute right-[-15%] bottom-0 size-[24rem] rounded-full bg-gold/15 blur-[120px]" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.08)}
        className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10"
      >
        <motion.div variants={fadeUp} className="text-center">
          <span className="font-display text-3xl italic text-cream">Moozen</span>
          <p className="mt-2 text-sm text-cream/60">Sign in to manage your storefront</p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-cream/80">
              Email
            </label>
            <div className="relative mt-1.5">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                placeholder="admin@moozen.com"
                className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-3.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs font-medium text-gold">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-cream/80">
              Password
            </label>
            <div className="relative mt-1.5">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-3.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            {errors.password && <p className="mt-1.5 text-xs font-medium text-gold">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest-dark transition-colors hover:bg-gold-light disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? (
              <Spinner size={16} />
            ) : (
              <>
                <LogIn className="size-4" strokeWidth={2} />
                Sign In
              </>
            )}
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}
