"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import { useToast } from "@/components/ui/Toast";
import { submitContactForm } from "@/lib/api/contact";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const INITIAL_VALUES = { name: "", email: "", phone: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Let us know what's on your mind.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A few more details would help (10+ characters).";
  }
  return errors;
}

function Field({ label, name, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-semibold text-forest-dark">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs font-medium text-terracotta">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-cream-dark bg-white/80 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/10";

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitContactForm(values);
      setStatus("success");
      setValues(INITIAL_VALUES);
      toast({
        variant: "success",
        title: "Message sent",
        description: "Thanks for reaching out — our team will be in touch soon.",
      });
    } catch (err) {
      setStatus("idle");
      toast({
        variant: "error",
        title: "Couldn't send your message",
        description: err.message || "Please try again in a moment.",
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(0.08)}
      className="rounded-[2rem] border border-cream-dark/60 bg-white/70 p-6 sm:p-9"
    >
      <motion.div variants={fadeUp} className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Anjali Rao"
            className={cn(inputClass, errors.name && "border-terracotta/60")}
          />
        </Field>
        <Field label="Email address" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={cn(inputClass, errors.email && "border-terracotta/60")}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </Field>
        <Field label="Subject" name="subject" error={errors.subject}>
          <input
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            placeholder="Bulk order enquiry"
            className={cn(inputClass, errors.subject && "border-terracotta/60")}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6">
        <Field label="Message" name="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us a little about what you need..."
            className={cn(inputClass, "resize-none", errors.message && "border-terracotta/60")}
          />
        </Field>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
        <Button type="submit" variant="primary" size="lg" icon={false} disabled={status === "submitting"}>
          <span className="inline-flex items-center gap-2">
            {status === "submitting" ? (
              <>
                <Spinner size={16} />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" strokeWidth={2} />
                Send Message
              </>
            )}
          </span>
        </Button>
        <p className="text-xs text-muted">We usually reply within one business day.</p>
      </motion.div>
    </motion.form>
  );
}
