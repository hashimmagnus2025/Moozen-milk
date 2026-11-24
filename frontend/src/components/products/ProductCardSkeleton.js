import { Skeleton } from "@/components/ui/Loading";

export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-cream-dark/60 bg-white/80 p-4">
      <Skeleton className="aspect-square w-full" />
      <div className="mt-4 flex flex-1 flex-col gap-2 px-1">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded-full" />
        <Skeleton className="h-3.5 w-full rounded-full" />
        <Skeleton className="h-3.5 w-2/3 rounded-full" />
        <div className="mt-auto flex items-center justify-between border-t border-cream-dark/60 pt-3">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
