import Section from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Loading";

export default function ProductDetailLoading() {
  return (
    <Section background="cream" className="pb-16 pt-32 lg:pb-20 lg:pt-40">
      <Skeleton className="mb-8 h-3 w-64 rounded-full" />

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-5">
          <Skeleton className="aspect-square w-full rounded-[2rem]" />
          <div className="flex gap-3 sm:w-24 sm:flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-20 shrink-0 rounded-xl sm:w-full" />
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="mt-5 h-10 w-4/5 rounded-2xl sm:h-12" />
          <Skeleton className="mt-4 h-5 w-full max-w-lg rounded-full" />
          <Skeleton className="mt-2 h-5 w-2/3 max-w-md rounded-full" />

          <Skeleton className="mt-9 h-3 w-24 rounded-full" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-16 w-24 rounded-2xl" />
            <Skeleton className="h-16 w-24 rounded-2xl" />
          </div>

          <Skeleton className="mt-9 h-9 w-32 rounded-full" />

          <div className="mt-6 flex gap-4">
            <Skeleton className="h-14 w-52 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-cream-dark/70 pt-7">
        <div className="flex gap-6">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="mt-6 h-4 w-full max-w-2xl rounded-full" />
        <Skeleton className="mt-2 h-4 w-full max-w-xl rounded-full" />
      </div>
    </Section>
  );
}
