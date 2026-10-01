import Image from "next/image";
import { PiDropFill } from "react-icons/pi";

/**
 * Homepage route loader. Uses the same cream base + soft glows as the hero so
 * the hand-off from loader to page is a seamless cross-fade, not a flash from
 * a dark screen. The content appears after a short delay (see globals.css) so
 * fast loads never show it at all.
 */
export default function HomeLoading() {
  return (
    <div
      role="status"
      aria-label="Loading Moozen"
      className="loader-motion relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f7f4e8]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-8%] size-72 rounded-full bg-sky-200/50 blur-[80px] lg:-left-32 lg:size-[32rem] lg:blur-[110px]" />
        <div className="absolute right-[-20%] bottom-[8%] size-72 rounded-full bg-gold/15 blur-[90px] lg:size-[28rem] lg:blur-[120px]" />
      </div>

      <div
        className="relative flex flex-col items-center gap-7"
        style={{ animation: "loader-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
      >
        <div className="relative flex size-24 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-forest/25"
            style={{ animation: "loader-ripple 2.2s ease-out infinite" }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-forest/25"
            style={{ animation: "loader-ripple 2.2s ease-out 1.1s infinite" }}
          />
          <span
            className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-16px_rgba(11,95,165,0.45)]"
            style={{ animation: "loader-drop 2.2s ease-in-out infinite" }}
          >
            <PiDropFill className="size-8 text-forest" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Image
            src="/media/logo/Moozen-logo.png"
            alt="Moozen"
            width={180}
            height={90}
            priority
            className="h-auto w-[150px] object-contain mix-blend-multiply"
          />
          <span className="relative h-[3px] w-24 overflow-hidden rounded-full bg-forest/10">
            <span
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gold"
              style={{ animation: "loader-bar 1.4s ease-in-out infinite" }}
            />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Fresh from the farm
          </span>
        </div>
      </div>
    </div>
  );
}
