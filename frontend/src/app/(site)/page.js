import Hero from "@/components/home/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SignatureProduct from "@/components/home/SignatureProduct";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Stats from "@/components/home/Stats";
import BrandStory from "@/components/home/BrandStory";
import NewArrivals from "@/components/home/NewArrivals";
import Recipes from "@/components/home/Recipes";
import Blogs from "@/components/home/Blogs";
import Testimonials from "@/components/home/Testimonials";
import Sustainability from "@/components/home/Sustainability";
import FinalCta from "@/components/home/FinalCta";
import { getAllCategories } from "@/lib/data/categories";
import { safeFetch } from "@/lib/api/safeFetch";

export default async function Home() {
  const categories = await safeFetch(getAllCategories(), []);

  return (
    <>
      <Hero />
      <BrandIntro />
      <ProductCategories categories={categories} />
      <FeaturedProducts />
      <SignatureProduct />
      <WhyChooseUs />
      <ProcessTimeline />
      <Stats />
      <BrandStory />
      <NewArrivals />
      <Recipes />
      <Blogs />
      <Testimonials />
      <Sustainability />
      <FinalCta />
    </>
  );
}
