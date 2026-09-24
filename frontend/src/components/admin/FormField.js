import { cn } from "@/lib/utils";

export const adminInputClass =
  "w-full rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/10";

/** Label + control + error wrapper shared by every admin form. */
export default function FormField({ label, htmlFor, error, hint, required, className, children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-forest-dark">
          {label}
          {required && <span className="ml-0.5 text-terracotta">*</span>}
        </label>
      )}
      <div className={label ? "mt-1.5" : undefined}>{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-terracotta">{error}</p>}
    </div>
  );
}

export function TextInput({ className, ...props }) {
  return <input className={cn(adminInputClass, className)} {...props} />;
}

export function TextArea({ className, rows = 4, ...props }) {
  return <textarea rows={rows} className={cn(adminInputClass, "resize-none", className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <select className={cn(adminInputClass, "appearance-none pr-8", className)} {...props}>
      {children}
    </select>
  );
}
