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
        className="relative mt-10 overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_-20px_rgba(42,38,32,0.35)] ring-1 ring-forest/10"
      >
        <img
          src="/media/cow.svg"
          alt="Animated illustration of a cow grazing on grass"
          className="block w-full saturate-[0.8] brightness-[0.97] contrast-[0.96]"
        />
      </Reveal>
    </Section>
  );
}
