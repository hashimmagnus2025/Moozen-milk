"use client";

import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SearchInput from "@/components/admin/SearchInput";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/admin/Pagination";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import InquiryDetailModal from "@/components/admin/inquiries/InquiryDetailModal";
import { useToast } from "@/components/ui/Toast";
import { fetchInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/api/contact";

const PAGE_SIZE = 10;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setInquiries(null);
    try {
      setInquiries(await fetchInquiries());
    } catch (err) {
      toast({ variant: "error", title: "Couldn't load inquiries", description: err.message });
      setInquiries([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!inquiries) return [];
    const q = search.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((i) => `${i.name} ${i.email} ${i.subject}`.toLowerCase().includes(q));
  }, [inquiries, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = async (inquiry, status) => {
    try {
      await updateInquiryStatus(inquiry._id, status);
      setInquiries((list) => list.map((i) => (i._id === inquiry._id ? { ...i, status } : i)));
      setSelected((s) => (s && s._id === inquiry._id ? { ...s, status } : s));
      toast({ variant: "success", title: `Marked as ${status}` });
    } catch (err) {
      toast({ variant: "error", title: "Couldn't update status", description: err.message });
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteInquiry(deleteTarget._id);
      toast({ variant: "success", title: "Inquiry deleted" });
      setDeleteTarget(null);
      setSelected(null);
      await load();
    } catch (err) {
      toast({ variant: "error", title: "Couldn't delete", description: err.message });
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "From",
      render: (row) => (
        <div>
          <p className="font-medium text-charcoal">{row.name}</p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    { key: "subject", header: "Subject", render: (row) => <span className="line-clamp-1">{row.subject}</span> },
    {
      key: "createdAt",
      header: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
  ];

  return (
    <div>
      <AdminPageHeader title="Contact Inquiries" description="Messages submitted through the storefront contact form." />

      <div className="mt-6 flex items-center justify-between gap-4">
        <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search inquiries..." />
        {inquiries && <p className="text-xs text-muted">{filtered.length} total</p>}
      </div>

      <div className="mt-4">
        <AdminTable
          columns={columns.map((c) => ({
            ...c,
            render: (row) => (
              <button type="button" onClick={() => setSelected(row)} className="block w-full text-left">
                {c.render(row)}
              </button>
            ),
          }))}
          rows={visible}
          loading={inquiries === null}
          emptyMessage="No inquiries yet."
        />
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />

      <InquiryDetailModal
        inquiry={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
        onDelete={(inquiry) => setDeleteTarget(inquiry)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this inquiry?"
      />
    </div>
  );
}
