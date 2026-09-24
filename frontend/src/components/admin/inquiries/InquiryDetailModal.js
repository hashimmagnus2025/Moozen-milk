"use client";

import { Mail, Phone, Calendar } from "lucide-react";
import Modal from "@/components/admin/Modal";
import StatusBadge from "@/components/admin/StatusBadge";
import Button from "@/components/ui/Button";

const STATUSES = ["new", "read", "resolved"];

export default function InquiryDetailModal({ inquiry, onClose, onStatusChange, onDelete }) {
  if (!inquiry) return null;

  return (
    <Modal open={!!inquiry} onClose={onClose} title={inquiry.subject} size="lg">
      <div className="flex flex-wrap items-center gap-3 border-b border-cream-dark/70 pb-5">
        <div>
          <p className="font-semibold text-forest-dark">{inquiry.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" />
              {inquiry.email}
            </span>
            {inquiry.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5" />
                {inquiry.phone}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {new Date(inquiry.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <StatusBadge value={inquiry.status} />
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-charcoal">{inquiry.message}</p>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-cream-dark/70 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted">Mark as:</span>
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Mark as ${s}`}
              onClick={() => onStatusChange(inquiry, s)}
              disabled={inquiry.status === s}
              className="rounded-full border border-cream-dark px-3 py-1.5 text-xs font-semibold capitalize text-charcoal transition-colors hover:border-forest/40 disabled:pointer-events-none disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
        <Button variant="danger" size="sm" icon={false} onClick={() => onDelete(inquiry)}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
