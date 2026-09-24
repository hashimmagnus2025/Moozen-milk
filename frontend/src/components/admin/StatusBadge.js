import { cn } from "@/lib/utils";

const TONE_MAP = {
  active: "bg-sage text-forest",
  published: "bg-sage text-forest",
  read: "bg-sage text-forest",
  resolved: "bg-sage text-forest",
  inactive: "bg-cream-dark/70 text-muted",
  draft: "bg-cream-dark/70 text-muted",
  new: "bg-gold/20 text-terracotta",
};

/** Small pill for status/read/published fields across admin tables. */
export default function StatusBadge({ value }) {
  const tone = TONE_MAP[value] ?? "bg-cream-dark/70 text-muted";
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize", tone)}>
      {value}
    </span>
  );
}
