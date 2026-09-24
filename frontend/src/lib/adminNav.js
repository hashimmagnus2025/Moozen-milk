import {
  LayoutDashboard,
  Package,
  Grid2x2,
  Newspaper,
  ChefHat,
  Quote,
  Mail,
  Settings,
} from "lucide-react";

export const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Grid2x2 },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Recipes", href: "/admin/recipes", icon: ChefHat },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
