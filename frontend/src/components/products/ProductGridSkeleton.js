import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { cn } from "@/lib/utils";

export default function ProductGridSkeleton({ count = 8, className }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
