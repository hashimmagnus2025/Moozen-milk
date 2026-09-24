"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import ResourceManager from "@/components/admin/ResourceManager";
import StatusBadge from "@/components/admin/StatusBadge";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api/categories";
import { resolveAssetUrl } from "@/lib/assetUrl";

const columns = [
  {
    key: "image",
    header: "",
    className: "w-16",
    render: (row) =>
      row.image ? (
        <div className="relative size-10 overflow-hidden rounded-lg bg-cream-deep">
          <Image src={resolveAssetUrl(row.image)} alt="" fill sizes="40px" className="object-cover" />
        </div>
      ) : (
        <div className="flex size-10 items-center justify-center rounded-lg bg-cream-deep text-muted">
          <ImageIcon className="size-4" />
        </div>
      ),
  },
  { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.name}</span> },
  { key: "slug", header: "Slug", render: (row) => <span className="text-muted">{row.slug}</span> },
  { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
];

export default function AdminCategoriesPage() {
  return (
    <ResourceManager
      resourceLabel="Category"
      resourceLabelPlural="Categories"
      columns={columns}
      searchKeys={["name", "slug"]}
      fetchAll={fetchCategories}
      FormComponent={CategoryForm}
      getFormInitialValues={(item) => ({
        name: item?.name ?? "",
        description: item?.description ?? "",
        status: item?.status ?? "active",
        image: item?.image ?? null,
      })}
      onCreate={(formData) => createCategory(formData)}
      onUpdate={(id, formData) => updateCategory(id, formData)}
      onDelete={(id) => deleteCategory(id)}
    />
  );
}
