"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Grid2x2, Newspaper, ChefHat, Quote, Mail, Users } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/admin/StatCard";
import { Skeleton } from "@/components/ui/Loading";
import { fetchProducts } from "@/lib/api/products";
import { fetchCategories } from "@/lib/api/categories";
import { fetchBlogs } from "@/lib/api/blogs";
import { fetchRecipes } from "@/lib/api/recipes";
import { fetchTestimonials } from "@/lib/api/testimonials";
import { fetchInquiries } from "@/lib/api/contact";
import { fetchSubscribers } from "@/lib/api/newsletter";
import { useAdminAuth } from "@/context/AdminAuthContext";

const CARD_CONFIG = [
  { key: "products", label: "Total Products", icon: Package, tone: "sage", href: "/admin/products" },
  { key: "categories", label: "Categories", icon: Grid2x2, tone: "gold", href: "/admin/categories" },
  { key: "blogs", label: "Blogs", icon: Newspaper, tone: "cream", href: "/admin/blogs" },
  { key: "recipes", label: "Recipes", icon: ChefHat, tone: "sage", href: "/admin/recipes" },
  { key: "testimonials", label: "Testimonials", icon: Quote, tone: "gold", href: "/admin/testimonials" },
  { key: "inquiries", label: "Contact Inquiries", icon: Mail, tone: "cream", href: "/admin/inquiries" },
  { key: "subscribers", label: "Newsletter Subscribers", icon: Users, tone: "sage", href: null },
];

export default function AdminDashboardPage() {
  const { admin } = useAdminAuth();
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      const [products, categories, blogs, recipes, testimonials, inquiries, subscribers] =
        await Promise.allSettled([
          fetchProducts({ limit: 1 }),
          fetchCategories(),
          fetchBlogs({ limit: 1 }),
          fetchRecipes({ limit: 1 }),
          fetchTestimonials(),
          fetchInquiries(),
          fetchSubscribers(),
        ]);

      if (cancelled) return;
      setCounts({
        products: products.status === "fulfilled" ? products.value.pagination.total : 0,
        categories: categories.status === "fulfilled" ? categories.value.length : 0,
        blogs: blogs.status === "fulfilled" ? blogs.value.pagination.total : 0,
        recipes: recipes.status === "fulfilled" ? recipes.value.pagination.total : 0,
        testimonials: testimonials.status === "fulfilled" ? testimonials.value.length : 0,
        inquiries: inquiries.status === "fulfilled" ? inquiries.value.length : 0,
        subscribers: subscribers.status === "fulfilled" ? subscribers.value.length : 0,
        newInquiries:
          inquiries.status === "fulfilled" ? inquiries.value.filter((i) => i.status === "new").length : 0,
      });
    }

    loadCounts();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxCount = counts ? Math.max(1, ...CARD_CONFIG.map((c) => counts[c.key] ?? 0)) : 1;

  return (
    <div>
      <AdminPageHeader
        title={`Welcome back${admin?.name ? `, ${admin.name.split(" ")[0]}` : ""}.`}
        description="Here's what's happening across your storefront."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {counts
          ? CARD_CONFIG.map((card, i) => (
              <StatCard
                key={card.key}
                icon={card.icon}
                label={card.label}
                value={counts[card.key] ?? 0}
                tone={card.tone}
                href={card.href}
                delay={i * 0.05}
              />
            ))
          : Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-[4.5rem] rounded-2xl" />
            ))}
      </div>

      {counts?.newInquiries > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4"
        >
          <Mail className="size-5 text-terracotta" strokeWidth={1.75} />
          <p className="text-sm text-charcoal">
            You have <span className="font-semibold">{counts.newInquiries}</span> unread contact{" "}
            {counts.newInquiries === 1 ? "inquiry" : "inquiries"}.
          </p>
        </motion.div>
      )}

      <div className="mt-8 rounded-2xl border border-cream-dark/70 bg-white p-6">
        <h2 className="font-display text-lg italic text-forest-dark">Content Overview</h2>
        <div className="mt-5 space-y-4">
          {counts
            ? CARD_CONFIG.map((card, i) => (
                <div key={card.key} className="flex items-center gap-4">
                  <span className="w-40 shrink-0 text-sm text-muted">{card.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-deep">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((counts[card.key] ?? 0) / maxCount) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-forest"
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-sm font-semibold text-forest-dark">
                    {counts[card.key] ?? 0}
                  </span>
                </div>
              ))
            : Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-3 w-full rounded-full" />)}
        </div>
      </div>
    </div>
  );
}
