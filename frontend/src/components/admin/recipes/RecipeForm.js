"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import FormField, { TextInput, TextArea } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";
import ListInput from "@/components/admin/ListInput";

export default function RecipeForm({ initialValues, onSubmit, onCancel, submitting }) {
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
    formData.append("description", values.description);
    formData.append("preparationTime", values.preparationTime);
    formData.append("cookingTime", values.cookingTime);
    formData.append("ingredients", JSON.stringify(values.ingredients.filter(Boolean)));
    formData.append("instructions", JSON.stringify(values.instructions.filter(Boolean)));
    if (files[0]) formData.append("image", files[0]);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Title" htmlFor="title" required>
        <TextInput id="title" name="title" value={values.title} onChange={handleChange} required />
      </FormField>

      <FormField label="Description" htmlFor="description" required>
        <TextArea id="description" name="description" rows={2} value={values.description} onChange={handleChange} required />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Preparation Time" htmlFor="preparationTime" required hint='e.g. "15 min"'>
          <TextInput id="preparationTime" name="preparationTime" value={values.preparationTime} onChange={handleChange} required />
        </FormField>
        <FormField label="Cooking Time" htmlFor="cookingTime" required hint='e.g. "20 min"'>
          <TextInput id="cookingTime" name="cookingTime" value={values.cookingTime} onChange={handleChange} required />
        </FormField>
      </div>

      <FormField label="Ingredients">
        <ListInput
          items={values.ingredients}
          onChange={(ingredients) => setValues((s) => ({ ...s, ingredients }))}
          placeholder="1 cup Moozen milk"
        />
      </FormField>

      <FormField label="Instructions">
        <ListInput
          items={values.instructions}
          onChange={(instructions) => setValues((s) => ({ ...s, instructions }))}
          placeholder="Describe this step..."
          multiline
        />
      </FormField>

      <FormField label="Image">
        <ImageDropzone existingUrls={values.image ? [values.image] : []} files={files} onFilesChange={setFiles} />
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
