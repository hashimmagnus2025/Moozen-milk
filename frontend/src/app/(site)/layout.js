import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/Toast";
import { SITE_URL } from "@/lib/siteUrl";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Moozen",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Moozen crafts premium, farm-fresh dairy rooted in Indian heritage — milk, ghee, paneer and more, made with purity and care.",
  sameAs: ["https://instagram.com", "https://facebook.com", "https://youtube.com"],
};

/** Public-site chrome — everything outside /admin gets this. */
export default function SiteLayout({ children }) {
  return (
    <ToastProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </ToastProvider>
  );
}
