import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const DESCRIPTION =
  "Moozen crafts premium, farm-fresh dairy rooted in Indian heritage — milk, ghee, paneer and more, made with purity and care.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Moozen — Pure Dairy, Honestly Made",
    template: "%s",
  },
  description: DESCRIPTION,
  keywords: [
    "Moozen",
    "premium dairy India",
    "A2 milk",
    "farm fresh milk",
    "cow ghee",
    "paneer online",
    "Indian dairy brand",
  ],
  authors: [{ name: "Moozen" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Moozen",
    title: "Moozen — Pure Dairy, Honestly Made",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moozen — Pure Dairy, Honestly Made",
    description: DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Bare shell only — html/body/fonts. Visual chrome (Navbar, Footer,
 * toasts, page transitions) and the Organization JSON-LD live in
 * app/(site)/layout.js so the noindexed /admin subtree doesn't inherit
 * either the public chrome or public-site structured data.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal font-sans antialiased selection:bg-gold/30 selection:text-charcoal">
        {children}
      </body>
    </html>
  );
}
