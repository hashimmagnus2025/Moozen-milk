import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Flame, ChefHat, Check } from "lucide-react";
import Section from "@/components/ui/Section";
import { getRecipeBySlug } from "@/lib/data/recipes";
import { SITE_URL } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} — Moozen Recipes`,
    description: recipe.description,
    alternates: { canonical: `${SITE_URL}/recipes/${recipe.slug}` },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `${SITE_URL}/recipes/${recipe.slug}`,
    },
  };
}

/** "15 min" -> "PT15M", for schema.org's ISO 8601 duration format. */
function toIsoDuration(text = "") {
  const match = String(text).match(/\d+/);
  return match ? `PT${match[0]}M` : undefined;
}

export default async function RecipeDetailPage({ params }) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    author: { "@type": "Organization", name: "Moozen" },
    prepTime: toIsoDuration(recipe.preparationTime),
    cookTime: toIsoDuration(recipe.cookingTime),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step) => ({ "@type": "HowToStep", text: step })),
  };

  return (
    <Section background="cream" className="pb-20 pt-32 lg:pt-40">
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-forest-dark">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/recipes" className="transition-colors hover:text-forest-dark">Recipes</Link>
        <ChevronRight className="size-3" />
        <span className="text-forest-dark">{recipe.title}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-dark via-forest to-moss/60 lg:aspect-auto">
          <div aria-hidden className="bg-noise absolute inset-0 opacity-20" />
          <Flame className="size-24 text-gold/80" strokeWidth={1.2} />
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest-dark">
            {recipe.difficulty}
          </span>
        </div>

        <div>
          <h1 className="text-balance-pretty font-display text-4xl italic leading-[1.08] text-forest-dark sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{recipe.description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-6 border-y border-cream-dark/70 py-5">
            <div className="flex items-center gap-2 text-sm text-charcoal">
              <Clock className="size-4 text-moss" />
              Prep: <span className="font-semibold">{recipe.preparationTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal">
              <ChefHat className="size-4 text-moss" />
              Cook: <span className="font-semibold">{recipe.cookingTime}</span>
            </div>
          </div>

          {recipe.ingredients.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl italic text-forest-dark">Ingredients</h2>
              <ul className="mt-4 space-y-2.5">
                {recipe.ingredients.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {recipe.instructions.length > 0 && (
        <div className="mt-16 border-t border-cream-dark/70 pt-12">
          <h2 className="font-display text-2xl italic text-forest-dark">Method</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="rounded-2xl border border-cream-dark/60 bg-white/70 p-5">
                <span className="flex size-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest-dark">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
