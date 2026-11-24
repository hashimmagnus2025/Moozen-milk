"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/admin/Modal";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";

/** Confirmation dialog for destructive admin actions (delete, etc.). */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
          <AlertTriangle className="size-6" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 font-display text-xl italic text-forest-dark">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <Button variant="outline" size="sm" icon={false} onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" icon={false} onClick={onConfirm} disabled={loading}>
            {loading ? <Spinner size={16} /> : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
