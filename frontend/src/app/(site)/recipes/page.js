import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import RecipeCard from "@/components/recipes/RecipeCard";
import { getLatestRecipes } from "@/lib/data/recipes";
import { safeFetch } from "@/lib/api/safeFetch";
import { fadeIn } from "@/lib/animations";

export const metadata = {
  title: "Recipes — Moozen",
  description: "Kitchen-tested recipes built around Moozen milk, ghee, paneer and curd.",
};

export default async function RecipesPage() {
  const recipes = await safeFetch(getLatestRecipes(24), []);

  return (
    <>
      <PageHeader
        eyebrow="From Our Kitchen"
        title="Recipes worth the extra ghee."
        description="Simple, kitchen-tested recipes built around everyday Moozen staples."
        breadcrumb={[{ label: "Recipes" }]}
      />

      <Section background="cream" className="pt-14 lg:pt-16">
        {recipes.length === 0 ? (
          <p className="text-sm text-muted">No recipes published yet — check back soon.</p>
        ) : (
          <RevealGroup
            variants={fadeIn}
            stagger={0.08}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {recipes.map((recipe) => (
              <RevealItem key={recipe.slug}>
                <RecipeCard recipe={recipe} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
    </>
  );
}
