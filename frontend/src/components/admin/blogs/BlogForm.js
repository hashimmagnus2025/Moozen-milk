"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import Toggle from "@/components/admin/Toggle";
import FormField, { TextInput, TextArea } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";

export default function BlogForm({ initialValues, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("excerpt", values.excerpt);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("author", values.author);
    formData.append("published", String(values.published));
    if (files[0]) formData.append("featuredImage", files[0]);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Title" htmlFor="title" required>
        <TextInput id="title" name="title" value={values.title} onChange={handleChange} required />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Category" htmlFor="category">
          <TextInput id="category" name="category" value={values.category} onChange={handleChange} placeholder="Nutrition" />
        </FormField>
        <FormField label="Author" htmlFor="author">
          <TextInput id="author" name="author" value={values.author} onChange={handleChange} />
        </FormField>
      </div>

      <FormField label="Excerpt" htmlFor="excerpt" required hint="Short summary shown on cards (max 300 chars).">
        <TextArea id="excerpt" name="excerpt" rows={2} value={values.excerpt} onChange={handleChange} required />
      </FormField>

      <FormField label="Content" htmlFor="content" required>
        <TextArea id="content" name="content" rows={8} value={values.content} onChange={handleChange} required />
      </FormField>

      <FormField label="Featured Image">
        <ImageDropzone existingUrls={values.featuredImage ? [values.featuredImage] : []} files={files} onFilesChange={setFiles} />
      </FormField>

      <Toggle checked={values.published} onChange={(v) => setValues((s) => ({ ...s, published: v }))} label="Published" />

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
