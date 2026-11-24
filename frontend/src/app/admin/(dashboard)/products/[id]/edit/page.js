"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/products/ProductForm";
import { PageLoader } from "@/components/ui/Loading";
import { useToast } from "@/components/ui/Toast";
import { fetchProducts, updateProduct } from "@/lib/api/products";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState(undefined); // undefined = loading, null = not found
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts({ limit: 200 })
      .then(({ items }) => setProduct(items.find((p) => p._id === id) ?? null))
      .catch(() => setProduct(null));
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateProduct(id, formData);
      toast({ variant: "success", title: "Product updated" });
      router.push("/admin/products");
    } catch (err) {
      toast({ variant: "error", title: "Couldn't update product", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (product === undefined) return <PageLoader />;

  if (product === null) {
    return <p className="text-sm text-muted">Product not found.</p>;
  }

  return (
    <div>
      <AdminPageHeader title="Edit Product" description={product.productName} />
      <div className="mt-6">
        <ProductForm
          initialValues={{
            productName: product.productName,
            category: product.category?._id ?? "",
            subCategory: product.subCategory ?? "",
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            packSizes: product.packSizes?.length ? product.packSizes : [{ size: "", price: "" }],
            ingredients: product.ingredients?.length ? product.ingredients : [""],
            benefits: product.benefits?.length ? product.benefits : [""],
            nutrition: product.nutrition?.length ? product.nutrition : [{ label: "", value: "" }],
            featured: product.featured,
            newArrival: product.newArrival,
            status: product.status,
            images: product.images ?? [],
          }}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
