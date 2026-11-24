"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/products/ProductForm";
import { useToast } from "@/components/ui/Toast";
import { createProduct } from "@/lib/api/products";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createProduct(formData);
      toast({ variant: "success", title: "Product created" });
      router.push("/admin/products");
    } catch (err) {
      toast({ variant: "error", title: "Couldn't create product", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Add Product" description="Create a new product for the storefront." />
      <div className="mt-6">
        <ProductForm initialValues={{}} onSubmit={handleSubmit} submitting={submitting} submitLabel="Create Product" />
      </div>
    </div>
  );
}
