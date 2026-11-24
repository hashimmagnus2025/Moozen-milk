import { cn } from "@/lib/utils";
import Container from "./Container";

const BACKGROUNDS = {
  cream: "bg-cream text-charcoal",
  deep: "bg-cream-deep text-charcoal",
  sage: "bg-sage text-charcoal",
  dark: "bg-orange-forest text-cream",
  transparent: "bg-transparent",
};

/**
 * Standard vertical-rhythm wrapper for homepage / page sections.
 * `contained={false}` opts out of the max-width container (e.g. full-bleed media).
 */
export default function Section({
  as: Tag = "section",
  background = "cream",
  contained = true,
  className,
  containerClassName,
  children,
  id,
  ref,
  ...props
}) {
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("section-y relative", BACKGROUNDS[background], className)}
      {...props}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
