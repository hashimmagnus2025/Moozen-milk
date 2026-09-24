"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/Loading";
import { useToast } from "@/components/ui/Toast";
import { subscribeToNewsletter } from "@/lib/api/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm({ className }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      toast({ variant: "error", title: "Enter a valid email address to subscribe." });
      return;
    }

    setStatus("submitting");
    try {
      await subscribeToNewsletter(email.trim());
      setEmail("");
      toast({ variant: "success", title: "Subscribed!", description: "Watch your inbox for fresh stories and offers." });
    } catch (err) {
      toast({ variant: "error", title: "Couldn't subscribe", description: err.message });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className ?? "flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-6"}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting"}
        placeholder="Your email address"
        className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="Subscribe"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-forest-dark transition-transform duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" ? <Spinner size={16} /> : <ArrowRight className="size-4" strokeWidth={2.25} />}
      </button>
    </form>
  );
}
