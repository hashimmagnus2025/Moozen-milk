"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import FormField, { TextInput, TextArea, Select } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";
import { cn } from "@/lib/utils";

export default function TestimonialForm({ initialValues, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("review", values.review);
    formData.append("rating", String(values.rating));
    formData.append("status", values.status);
    if (files[0]) formData.append("image", files[0]);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Name" htmlFor="name" required>
        <TextInput id="name" name="name" value={values.name} onChange={handleChange} required />
      </FormField>

      <FormField label="Review" htmlFor="review" required>
        <TextArea id="review" name="review" rows={3} value={values.review} onChange={handleChange} required />
      </FormField>

      <FormField label="Rating">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValues((s) => ({ ...s, rating: n }))}
              aria-label={`${n} stars`}
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  n <= Number(values.rating) ? "fill-gold text-gold" : "text-cream-dark"
                )}
              />
            </button>
          ))}
        </div>
      </FormField>

      <FormField label="Image">
        <ImageDropzone existingUrls={values.image ? [values.image] : []} files={files} onFilesChange={setFiles} />
      </FormField>

      <FormField label="Status" htmlFor="status">
        <Select id="status" name="status" value={values.status} onChange={handleChange}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
      </FormField>

      <div className="flex items-center justify-end gap-3 border-t border-cream-dark/70 pt-5">
        <Button type="button" variant="outline" size="sm" icon={false} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" icon={false} disabled={submitting}>
          {submitting ? <Spinner size={16} /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
