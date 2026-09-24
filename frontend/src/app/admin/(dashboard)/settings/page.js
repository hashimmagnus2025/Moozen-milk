"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Mail, Calendar, LogOut } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormField, { TextInput, TextArea } from "@/components/admin/FormField";
import ImageDropzone from "@/components/admin/ImageDropzone";
import Button from "@/components/ui/Button";
import { Spinner, Skeleton } from "@/components/ui/Loading";
import { useToast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { fetchSettings, updateSettings } from "@/lib/api/settings";

function GeneralSettingsForm() {
  const [values, setValues] = useState(null);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings().then(setValues);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("instagramUrl", values.instagramUrl);
      formData.append("facebookUrl", values.facebookUrl);
      formData.append("footerText", values.footerText);
      if (files[0]) formData.append("logo", files[0]);

      const updated = await updateSettings(formData);
      setValues(updated);
      setFiles([]);
      toast({ variant: "success", title: "Settings updated" });
    } catch (err) {
      toast({ variant: "error", title: "Couldn't save", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!values) {
    return (
      <div className="mt-6 max-w-lg space-y-4">
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-lg rounded-2xl border border-cream-dark/70 bg-white p-6">
      <h2 className="font-display text-lg italic text-forest-dark">General Settings</h2>
      <div className="mt-4 space-y-5">
        <FormField label="Company Name" htmlFor="companyName">
          <TextInput id="companyName" name="companyName" value={values.companyName} onChange={handleChange} />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <TextInput id="email" name="email" type="email" value={values.email} onChange={handleChange} />
        </FormField>
        <FormField label="Phone" htmlFor="phone">
          <TextInput id="phone" name="phone" value={values.phone} onChange={handleChange} />
        </FormField>
        <FormField label="Address" htmlFor="address">
          <TextArea id="address" name="address" rows={3} value={values.address} onChange={handleChange} />
        </FormField>
        <FormField label="Logo">
          <ImageDropzone existingUrls={values.logo ? [values.logo] : []} files={files} onFilesChange={setFiles} />
        </FormField>
        <FormField label="Instagram URL" htmlFor="instagramUrl">
          <TextInput id="instagramUrl" name="instagramUrl" value={values.instagramUrl} onChange={handleChange} />
        </FormField>
        <FormField label="Facebook URL" htmlFor="facebookUrl">
          <TextInput id="facebookUrl" name="facebookUrl" value={values.facebookUrl} onChange={handleChange} />
        </FormField>
        <FormField label="Footer Text" htmlFor="footerText">
          <TextArea id="footerText" name="footerText" rows={2} value={values.footerText} onChange={handleChange} />
        </FormField>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" size="sm" icon={false} disabled={submitting}>
          {submitting ? <Spinner size={16} /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default function AdminSettingsPage() {
  const { admin, logout } = useAdminAuth();

  return (
    <div>
      <AdminPageHeader title="Settings" description="Your admin account details and general company settings." />
      <div className=" grid grid-cols-1 gap-6 lg:grid-cols-2">

        <GeneralSettingsForm />

        <div className="mt-6 max-w-lg rounded-2xl border border-cream-dark/70 bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-sage text-lg font-semibold uppercase text-forest">
              {admin?.name?.[0] ?? "A"}
            </span>
            <div>
              <p className="font-display text-xl italic text-forest-dark">{admin?.name}</p>
              <p className="text-sm capitalize text-muted">{admin?.role}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-cream-dark/70 pt-5 text-sm">
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 text-muted" />
              <dt className="sr-only">Email</dt>
              <dd className="text-charcoal">{admin?.email}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-muted" />
              <dt className="sr-only">Role</dt>
              <dd className="capitalize text-charcoal">{admin?.role}</dd>
            </div>
            {admin?.createdAt && (
              <div className="flex items-center gap-2.5">
                <Calendar className="size-4 text-muted" />
                <dt className="sr-only">Admin since</dt>
                <dd className="text-charcoal">Admin since {new Date(admin.createdAt).toLocaleDateString()}</dd>
              </div>
            )}
          </dl>

          <p className="mt-6 text-xs text-muted">
            To change your password or add another admin, use the <code className="rounded bg-cream-deep px-1.5 py-0.5">npm run seed:admin</code> script on the backend.
          </p>

          <Button variant="outline" size="sm" icon={false} onClick={logout} className="mt-6">
            <span className="inline-flex items-center gap-1.5">
              <LogOut className="size-4" />
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
