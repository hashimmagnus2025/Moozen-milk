import { Skeleton } from "@/components/ui/Loading";

/** Shown briefly while the homepage's server-fetched sections resolve. */
export default function HomeLoading() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-forest-dark px-6">
      <span className="font-display text-3xl italic text-cream">Moozen</span>
      <div className="flex w-full max-w-md flex-col items-center gap-3">
        <Skeleton className="h-3 w-40 rounded-full bg-white/10" />
        <Skeleton className="h-10 w-full rounded-2xl bg-white/10" />
        <Skeleton className="h-10 w-3/4 rounded-2xl bg-white/10" />
      </div>
    </div>
  );
}
