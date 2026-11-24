"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchInput from "@/components/admin/SearchInput";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Toggle from "@/components/admin/Toggle";
import Button from "@/components/ui/Button";
import { Select } from "@/components/admin/FormField";
import { useToast } from "@/components/ui/Toast";
import { fetchProducts, updateProduct, deleteProduct } from "@/lib/api/products";
import { fetchCategories } from "@/lib/api/categories";
import { resolveAssetUrl } from "@/lib/assetUrl";

const PAGE_SIZE = 10;

export default function AdminProductsPage() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setProducts(null);
    try {
      const [{ items }, cats] = await Promise.all([fetchProducts({ limit: 200 }), fetchCategories()]);
      setProducts(items);
      setCategories(cats);
    } catch (err) {
      toast({ variant: "error", title: "Couldn't load products", description: err.message });
      setProducts([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category?.slug !== categoryFilter) return false;
      if (q && !`${p.productName} ${p.subCategory ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, search, categoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleField = async (product, field, value) => {
    setProducts((list) => list.map((p) => (p._id === product._id ? { ...p, [field]: value } : p)));
    try {
      const formData = new FormData();
      formData.append(field, String(value));
      await updateProduct(product._id, formData);
    } catch (err) {
      toast({ variant: "error", title: "Update failed", description: err.message });
      load();
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      toast({ variant: "success", title: "Product deleted" });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast({ variant: "error", title: "Couldn't delete", description: err.message });
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "image",
      header: "",
      className: "w-16",
      render: (row) =>
        row.images?.[0] ? (
          <div className="relative size-11 overflow-hidden rounded-lg bg-cream-deep">
            <Image src={resolveAssetUrl(row.images[0])} alt="" fill sizes="44px" className="object-cover" />
          </div>
        ) : (
          <div className="flex size-11 items-center justify-center rounded-lg bg-cream-deep text-muted">
            <ImageIcon className="size-4" />
          </div>
        ),
    },
    {
      key: "productName",
      header: "Product",
      render: (row) => (
        <div>
          <p className="font-medium text-charcoal">{row.productName}</p>
          <p className="text-xs text-muted">{row.category?.name ?? "—"}</p>
        </div>
      ),
    },
    { key: "price", header: "Price", render: (row) => `₹${row.price}` },
    {
      key: "featured",
      header: "Featured",
      render: (row) => <Toggle checked={row.featured} onChange={(v) => toggleField(row, "featured", v)} />,
    },
    {
      key: "newArrival",
      header: "New",
      render: (row) => <Toggle checked={row.newArrival} onChange={(v) => toggleField(row, "newArrival", v)} />,
    },
    {
      key: "status",
      header: "Active",
      render: (row) => (
        <Toggle
          checked={row.status === "active"}
          onChange={(v) => toggleField(row, "status", v ? "active" : "inactive")}
        />
      ),
    },
    {
      key: "__actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/admin/products/${row._id}/edit`}
            aria-label={`Edit ${row.productName}`}
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream-deep hover:text-forest-dark"
          >
            <Pencil className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            aria-label={`Delete ${row.productName}`}
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-terracotta/10 hover:text-terracotta"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Products"
        action={
          <Button href="/admin/products/new" size="sm" icon={false}>
            <span className="inline-flex items-center gap-1.5">
              <Plus className="size-4" strokeWidth={2.25} />
              Add Product
            </span>
          </Button>
        }
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search products..." />
          <Select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        {products && <p className="text-xs text-muted">{filtered.length} total</p>}
      </div>

      <div className="mt-4">
        <AdminTable columns={columns} rows={visible} loading={products === null} emptyMessage="No products yet." />
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this product?"
        description={`"${deleteTarget?.productName}" will be permanently removed, including its images.`}
      />
    </div>
  );
}
