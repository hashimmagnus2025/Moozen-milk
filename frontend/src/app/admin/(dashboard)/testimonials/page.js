"use client";

import { Star } from "lucide-react";
import ResourceManager from "@/components/admin/ResourceManager";
import StatusBadge from "@/components/admin/StatusBadge";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/api/testimonials";

const columns = [
  { key: "name", header: "Name", render: (row) => <span className="font-medium">{row.name}</span> },
  { key: "review", header: "Review", render: (row) => <span className="line-clamp-1 text-muted">{row.review}</span> },
  {
    key: "rating",
    header: "Rating",
    render: (row) => (
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5 fill-gold text-gold" />
        {row.rating}
      </span>
    ),
  },
  { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
];

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      resourceLabel="Testimonial"
      columns={columns}
      searchKeys={["name", "review"]}
      fetchAll={() => fetchTestimonials()}
      FormComponent={TestimonialForm}
      getFormInitialValues={(item) => ({
        name: item?.name ?? "",
        review: item?.review ?? "",
        rating: item?.rating ?? 5,
        status: item?.status ?? "draft",
        image: item?.image ?? "",
      })}
      onCreate={(payload) => createTestimonial(payload)}
      onUpdate={(id, payload) => updateTestimonial(id, payload)}
      onDelete={(id) => deleteTestimonial(id)}
    />
  );
}
