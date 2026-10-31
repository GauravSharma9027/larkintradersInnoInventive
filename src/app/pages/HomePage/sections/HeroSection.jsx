// Purpose: Reproduce the approved Larkin Traders hero using the supplied full-width hero artwork as its background.
// The artwork already contains the right-side brand mark and machine tagline, so no duplicate overlays are rendered.
// Scroll reveal is bidirectional: it enters when the hero enters the viewport and reverses when it leaves.

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Settings, ShieldCheck } from "lucide-react";
import Button from "../../../../components/ui/Button.jsx";

const HERO_CONTENT = {
  eyebrow:
    "INDUSTRIAL SUPPLY  |  ENGINEERING SERVICES  |  AUTOMATION SOLUTIONS",
  headlineFirstLine: "YOUR INDUSTRIAL",
  headlineSecondLine: "REQUIREMENT.",
  headlineSecond: "OUR COMPLETE SOLUTION.",
  description:
    "Larkin Traders Pvt Ltd provides industrial products, engineering services and automation solutions for manufacturing, engineering and industrial applications.",
  primaryAction: "REQUEST A QUOTE",
  secondaryAction: "EXPLORE OUR SOLUTIONS",
  proofPoints: [
    { label: "Quality Products", Icon: Settings },
    { label: "Reliable Services", Icon: ShieldCheck },
    { label: "Better Productivity", Icon: BarChart3 },
  ],
};

const HERO_BACKGROUND_IMAGE =
  "url('/assets/CNC Machinery in a Blue Tech Factory.png')";

// Shared scroll reveal animation.
const getRevealClassName = (isVisible) =>
  `transform-gpu transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

export default function HeroSection() {
  const heroSectionRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const heroSectionElement = heroSectionRef.current;

    if (!heroSectionElement) return undefined;

    // Respect reduced motion accessibility preferences.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsHeroVisible(true);
      return undefined;
    }

    const heroVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        // Reset when the section leaves the viewport.
        // This allows the animation to replay in both scroll directions.
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    heroVisibilityObserver.observe(heroSectionElement);

    return () => {
      heroVisibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      aria-label="Larkin Traders industrial solutions"
      className="relative isolate flex sm:min-h-[80vh] w-full overflow-hidden bg-[#03284d] text-white"
    >
      {/* Desktop and tablet background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-no-repeat sm:block"
        style={{
          backgroundImage: HERO_BACKGROUND_IMAGE,
          backgroundPosition: "center center",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Mobile background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-no-repeat sm:hidden"
        style={{
          backgroundImage: HERO_BACKGROUND_IMAGE,
          backgroundPosition: "62% center",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Mobile readability overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#03284d]/55 via-[#03284d]/65 to-[#03284d]/95 sm:hidden"
      />

      <div className="relative z-10 mx-auto flex sm:min-h-[80vh] w-full max-w-[1440px] flex-col justify-between px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-14 md:px-[4.6%] md:pb-[4.5vh] md:pt-[8.5vh]">
        <div className="flex w-full flex-col md:w-[49%]">
          {/* Eyebrow */}
          <p
            className={`${getRevealClassName(isHeroVisible)} text-[9px] font-bold uppercase leading-[1.35] tracking-[0.19em] text-sky-100 sm:text-[10px]`}
            style={{
              transitionDelay: isHeroVisible ? "0ms" : "0ms",
            }}
          >
            {HERO_CONTENT.eyebrow}
          </p>

          {/* Main heading */}
          <h1
            className={`${getRevealClassName(isHeroVisible)} mt-4 max-w-[590px] font-heading text-[clamp(2.2rem,3.5vw,2.575rem)] font-semibold uppercase leading-[1.03] tracking-[-0.02em] sm:mt-[18px]`}
            style={{
              transitionDelay: isHeroVisible ? "90ms" : "0ms",
            }}
          >
            {HERO_CONTENT.headlineFirstLine}
            <br />
            {HERO_CONTENT.headlineSecondLine}

            <span className="mt-1 block text-[#24a9ec]">
              {HERO_CONTENT.headlineSecond}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`${getRevealClassName(isHeroVisible)} mt-3 max-w-107.5 text-sm font-normal leading-[1.35] text-white/95`}
            style={{
              transitionDelay: isHeroVisible ? "180ms" : "0ms",
            }}
          >
            {HERO_CONTENT.description}
          </p>

          {/* Action buttons */}
          <div
            className={`${getRevealClassName(isHeroVisible)} mt-4 flex flex-wrap items-center gap-3`}
            style={{
              transitionDelay: isHeroVisible ? "260ms" : "0ms",
            }}
          >
            <Button
              to="/contact-us"
              size="large"
              className="min-h-9.5 px-6 py-3.5 text-xs transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {HERO_CONTENT.primaryAction}
              <ArrowRight size={14} strokeWidth={2.5} />
            </Button>

            <Button
              to="/solutions"
              variant="secondary"
              size="large"
              className="min-h-9.5 px-7 py-3.5 text-xs transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {HERO_CONTENT.secondaryAction}
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-semibold leading-none sm:gap-x-8 md:mt-0 md:text-[10px]">
          {HERO_CONTENT.proofPoints.map(({ label, Icon }, index) => (
            <div
              key={label}
              className={`${getRevealClassName(isHeroVisible)} flex items-center gap-2 whitespace-nowrap`}
              style={{
                transitionDelay: isHeroVisible
                  ? `${340 + index * 80}ms`
                  : "0ms",
              }}
            >
              <Icon size={25} strokeWidth={2.7} aria-hidden="true" />

              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
