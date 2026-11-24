"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchInput from "@/components/admin/SearchInput";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/admin/Pagination";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const PAGE_SIZE = 8;

/**
 * Generic list + search + add/edit modal + delete-confirm for the
 * simpler admin resources (categories, blogs, recipes, testimonials).
 * Each resource page supplies its columns, form and API calls; this
 * component owns the shared list/search/pagination/modal plumbing so
 * that logic isn't rewritten four times.
 */
export default function ResourceManager({
  resourceLabel,
  resourceLabelPlural,
  columns,
  fetchAll,
  searchKeys,
  FormComponent,
  getFormInitialValues,
  onCreate,
  onUpdate,
  onDelete,
  modalSize = "md",
}) {
  const plural = resourceLabelPlural ?? `${resourceLabel}s`;
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalItem, setModalItem] = useState(undefined); // undefined = closed, null = new, object = edit
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setItems(null);
    try {
      const data = await fetchAll();
      setItems(data);
    } catch (err) {
      toast({ variant: "error", title: `Couldn't load ${resourceLabel.toLowerCase()}s`, description: err.message });
      setItems([]);
    }
  };

  useEffect(() => {
    // One-time fetch on mount — intentionally outside React's data flow.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!items) return [];
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => searchKeys.some((key) => String(item[key] ?? "").toLowerCase().includes(q)));
  }, [items, search, searchKeys]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (modalItem) {
        await onUpdate(modalItem._id, values);
        toast({ variant: "success", title: `${resourceLabel} updated` });
      } else {
        await onCreate(values);
        toast({ variant: "success", title: `${resourceLabel} created` });
      }
      setModalItem(undefined);
      await load();
    } catch (err) {
      toast({ variant: "error", title: "Something went wrong", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(deleteTarget._id);
      toast({ variant: "success", title: `${resourceLabel} deleted` });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast({ variant: "error", title: "Couldn't delete", description: err.message });
    } finally {
      setDeleting(false);
    }
  };

  const tableColumns = [
    ...columns,
    {
      key: "__actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setModalItem(row)}
            aria-label={`Edit ${row.name ?? row.title ?? ""}`}
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream-deep hover:text-forest-dark"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            aria-label={`Delete ${row.name ?? row.title ?? ""}`}
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
        title={plural}
        action={
          <Button size="sm" icon={false} onClick={() => setModalItem(null)}>
            <span className="inline-flex items-center gap-1.5">
              <Plus className="size-4" strokeWidth={2.25} />
              Add {resourceLabel}
            </span>
          </Button>
        }
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder={`Search ${plural.toLowerCase()}...`} />
        {items && <p className="text-xs text-muted">{filtered.length} total</p>}
      </div>

      <div className="mt-4">
        <AdminTable columns={tableColumns} rows={visible} loading={items === null} emptyMessage={`No ${plural.toLowerCase()} yet.`} />
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />

      <Modal
        open={modalItem !== undefined}
        onClose={() => setModalItem(undefined)}
        title={modalItem ? `Edit ${resourceLabel}` : `Add ${resourceLabel}`}
        size={modalSize}
      >
        {modalItem !== undefined && (
          <FormComponent
            initialValues={getFormInitialValues(modalItem)}
            onSubmit={handleSubmit}
            onCancel={() => setModalItem(undefined)}
            submitting={submitting}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Delete this ${resourceLabel.toLowerCase()}?`}
        description="This action cannot be undone."
      />
    </div>
  );
}
