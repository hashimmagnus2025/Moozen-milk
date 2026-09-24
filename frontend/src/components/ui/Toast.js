"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = createContext(null);

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    iconClass: "bg-sage text-forest",
  },
  error: {
    icon: XCircle,
    iconClass: "bg-terracotta/15 text-terracotta",
  },
  info: {
    icon: Info,
    iconClass: "bg-gold/20 text-terracotta",
  },
};

let idCounter = 0;

/** Mounted once in the root layout; call useToast() anywhere below it to fire toasts. */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "success", duration = 4500 }) => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, title, description, variant }]);
      if (duration) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6"
      >
        <AnimatePresence>
          {toasts.map(({ id, title, description, variant }) => {
            const { icon: Icon, iconClass } = VARIANTS[variant] ?? VARIANTS.info;
            return (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-cream-dark/60 bg-white/95 p-4 shadow-[0_20px_44px_-16px_rgba(42,38,32,0.35)] backdrop-blur"
              >
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", iconClass)}>
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  {title && <p className="text-sm font-semibold text-forest-dark">{title}</p>}
                  {description && (
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(id)}
                  aria-label="Dismiss notification"
                  className="shrink-0 text-muted transition-colors hover:text-charcoal"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider.");
  return ctx;
}
