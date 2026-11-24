import Link from "next/link";
import { Clock, Flame, ArrowUpRight } from "lucide-react";

/** Shared recipe card used on the homepage teaser and the full /recipes listing. */
export default function RecipeCard({ recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/70"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-moss/60 transition-transform duration-500 group-hover:scale-[1.02]">
        <div aria-hidden className="bg-noise absolute inset-0 opacity-20" />
        <Flame className="size-14 text-gold/80" strokeWidth={1.3} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-forest-dark">
          {recipe.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Clock className="size-3.5" />
          {recipe.time}
        </div>
        <h3 className="mt-3 font-display text-2xl italic leading-snug text-forest-dark">{recipe.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{recipe.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-forest-dark">
          View recipe
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
