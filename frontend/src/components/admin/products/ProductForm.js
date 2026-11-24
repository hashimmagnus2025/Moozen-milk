"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import Toggle from "@/components/admin/Toggle";
import FormField, { TextInput, TextArea, Select } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";
import ListInput from "@/components/admin/ListInput";
import PairListInput from "@/components/admin/products/PairListInput";
import PackSizeListInput from "@/components/admin/products/PackSizeListInput";
import { fetchCategories } from "@/lib/api/categories";

const EMPTY_VALUES = {
  productName: "",
  category: "",
  subCategory: "",
  shortDescription: "",
  description: "",
  price: "",
  packSizes: [{ size: "", price: "" }],
  ingredients: [""],
  benefits: [""],
  nutrition: [{ label: "", value: "" }],
  featured: false,
  newArrival: false,
  status: "active",
  images: [],
};

export default function ProductForm({ initialValues, onSubmit, submitting, submitLabel = "Save Product" }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues });
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [packImageFiles, setPackImageFiles] = useState(values.packSizes.map(() => []));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.productName.trim()) next.productName = "Product name is required.";
    if (!values.category) next.category = "Select a category.";
    if (!values.shortDescription.trim()) next.shortDescription = "Short description is required.";
    if (!values.description.trim()) next.description = "Description is required.";
    if (!values.price || Number(values.price) < 0) next.price = "Enter a valid price.";
    const validPackSizes = values.packSizes.filter((p) => p.size && p.price);
    if (validPackSizes.length === 0) next.packSizes = "Add at least one pack size.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("featured", String(values.featured));
    formData.append("newArrival", String(values.newArrival));
    formData.append("status", values.status);
    formData.append("ingredients", JSON.stringify(values.ingredients.filter(Boolean)));
    formData.append("benefits", JSON.stringify(values.benefits.filter(Boolean)));
    formData.append("nutrition", JSON.stringify(values.nutrition.filter((n) => n.label && n.value)));
    const validPackSizes = values.packSizes
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => p.size && p.price);
    formData.append(
      "packSizes",
      JSON.stringify(
        validPackSizes.map(({ p }) => ({ size: p.size, price: Number(p.price), images: p.images ?? [] }))
      )
    );
    validPackSizes.forEach(({ i }, newIndex) => {
      (packImageFiles[i] ?? []).forEach((file) => formData.append(`packImages_${newIndex}`, file));
    });
    files.forEach((file) => formData.append("images", file));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Basics</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField label="Product Name" htmlFor="productName" required error={errors.productName}>
            <TextInput id="productName" name="productName" value={values.productName} onChange={handleChange} />
          </FormField>
          <FormField label="Category" htmlFor="category" required error={errors.category}>
            <Select id="category" name="category" value={values.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Sub-category" htmlFor="subCategory">
            <TextInput id="subCategory" name="subCategory" value={values.subCategory} onChange={handleChange} placeholder="A2 Milk" />
          </FormField>
          <FormField label="Price (₹)" htmlFor="price" required error={errors.price} hint="Starting/base price.">
            <TextInput id="price" name="price" type="number" min="0" value={values.price} onChange={handleChange} />
          </FormField>
        </div>

        <FormField
          className="mt-5"
          label="Short Description"
          htmlFor="shortDescription"
          required
          error={errors.shortDescription}
          hint="Shown on product cards (max 300 characters)."
        >
          <TextArea id="shortDescription" name="shortDescription" rows={2} value={values.shortDescription} onChange={handleChange} />
        </FormField>

        <FormField className="mt-5" label="Description" htmlFor="description" required error={errors.description}>
          <TextArea id="description" name="description" rows={4} value={values.description} onChange={handleChange} />
        </FormField>
      </section>

      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Images</h2>
        <p className="mt-1 text-sm text-muted">First image is used as the primary product photo.</p>
        <div className="mt-4">
          <ImageDropzone existingUrls={values.images} files={files} onFilesChange={setFiles} multiple maxFiles={6} />
        </div>
      </section>

      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Pack Sizes</h2>
        <p className="mt-1 text-sm text-muted">Optional per-size photos — e.g. different shots for 500ml vs 1L.</p>
        {errors.packSizes && <p className="mt-1 text-xs font-medium text-terracotta">{errors.packSizes}</p>}
        <div className="mt-4">
          <PackSizeListInput
            items={values.packSizes}
            onChange={(packSizes) => setValues((s) => ({ ...s, packSizes }))}
            files={packImageFiles}
            onFilesChange={setPackImageFiles}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Ingredients &amp; Benefits</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <FormField label="Ingredients">
            <ListInput items={values.ingredients} onChange={(ingredients) => setValues((s) => ({ ...s, ingredients }))} placeholder="Cow milk" />
          </FormField>
          <FormField label="Benefits">
            <ListInput items={values.benefits} onChange={(benefits) => setValues((s) => ({ ...s, benefits }))} placeholder="High in protein" />
          </FormField>
        </div>
      </section>

      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Nutrition (per 100g/100ml)</h2>
        <div className="mt-4">
          <PairListInput
            items={values.nutrition}
            onChange={(nutrition) => setValues((s) => ({ ...s, nutrition }))}
            fieldA="label"
            fieldB="value"
            placeholderA="Energy"
            placeholderB="62 kcal"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Visibility</h2>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <Toggle checked={values.featured} onChange={(v) => setValues((s) => ({ ...s, featured: v }))} label="Featured" />
          <Toggle checked={values.newArrival} onChange={(v) => setValues((s) => ({ ...s, newArrival: v }))} label="New Arrival" />
          <FormField label="Status" htmlFor="status" className="ml-auto w-40">
            <Select id="status" name="status" value={values.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FormField>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <Button href="/admin/products" variant="outline" size="md" icon={false}>
          Cancel
        </Button>
        <Button type="submit" size="md" icon={false} disabled={submitting}>
          {submitting ? <Spinner size={16} /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
