import Section from "@/components/ui/Section";
import { CardEyebrow } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp, imageReveal } from "@/lib/animations";

export default function FarmScene() {
  return (
    <Section background="deep">
      <Reveal variants={fadeUp} className="text-center">
        <CardEyebrow className="justify-center">From Our Farms</CardEyebrow>
        <h2 className="mx-auto mt-4 max-w-xl text-balance-pretty font-display text-3xl italic leading-[1.15] text-forest-dark sm:text-4xl">
          Every morning, our herd grazes free before the milk ever reaches you.
        </h2>
      </Reveal>

      <Reveal
        variants={imageReveal}
        delay={0.1}
        className="relative mt-8 overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(7,61,107,0.3)] ring-1 ring-forest/10 sm:mt-10 sm:rounded-[2.5rem]"
      >
        {/* The artwork has a baked-in off-white backdrop with rounded corners;
            crop in slightly (object-cover + scale) so those edges never show,
            and keep the cow large on narrow screens. */}
        <img
          src="/media/cow.svg"
          alt="A Moozen cow grazing freely on a green pasture"
          loading="lazy"
          decoding="async"
          className="block aspect-[4/3] w-full scale-[1.06] object-cover object-[50%_60%] sm:aspect-[3/2] sm:scale-[1.06] sm:object-center"
        />
      </Reveal>
    </Section>
  );
}
