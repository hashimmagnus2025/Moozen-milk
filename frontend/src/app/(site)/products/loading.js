import Section from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Loading";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <>
      <Section background="deep" className="pb-14 pt-36 lg:pb-16 lg:pt-40">
        <Skeleton className="h-3 w-40 rounded-full" />
        <Skeleton className="mt-6 h-3 w-28 rounded-full" />
        <Skeleton className="mt-4 h-11 w-full max-w-lg rounded-2xl sm:h-14" />
        <Skeleton className="mt-3 h-11 w-2/3 max-w-md rounded-2xl sm:h-14" />
        <Skeleton className="mt-6 h-5 w-full max-w-xl rounded-full" />
      </Section>

      <Section background="cream" className="pt-14 lg:pt-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-12 w-full max-w-sm rounded-full" />
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>

        <Skeleton className="mt-6 h-4 w-40 rounded-full" />
        <ProductGridSkeleton count={8} className="mt-6" />
      </Section>
    </>
  );
}
