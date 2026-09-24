import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardEyebrow } from "@/components/ui/Card";
import RecipeCard from "@/components/recipes/RecipeCard";
import { getLatestRecipes } from "@/lib/data/recipes";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeUp, fadeIn } from "@/lib/animations";

export default async function Recipes() {
  const recipes = await safeFetch(getLatestRecipes(3), []);
  if (recipes.length === 0) return null;

  return (
    <Section background="sage">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal variants={fadeUp} className="max-w-xl">
          <CardEyebrow>From Our Kitchen</CardEyebrow>
          <h2 className="mt-4 font-display text-4xl italic leading-[1.1] text-forest-dark sm:text-5xl">
            Recipes worth the extra ghee.
          </h2>
        </Reveal>
        <Reveal variants={fadeUp} delay={0.1}>
          <Link
            href="/recipes"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-dark"
          >
            View all recipes
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <RevealGroup
        variants={fadeIn}
        stagger={0.1}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recipes.map((recipe) => (
          <RevealItem key={recipe.slug}>
            <RecipeCard recipe={recipe} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
