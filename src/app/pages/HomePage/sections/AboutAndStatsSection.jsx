// Purpose: Present the company introduction alongside the four key business proof points.
// Scroll reveal is bidirectional: elements enter on scroll down and reverse when the section leaves the viewport.
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, MapPin, Users, Warehouse } from "lucide-react";
import { Link } from "react-router";

const COMPANY_INTRODUCTION = {
  eyebrow: "ABOUT LARKIN TRADERS",
  title: "Your Trusted Industrial Solutions Partner",
  description:
    "Larkin Traders Pvt Ltd provides industrial products, procurement support, engineering services and industrial solutions for manufacturing and engineering requirements.",
  linkLabel: "More About Us",
};

const COMPANY_STATISTICS = [
  { value: "500+", label: "Verified Vendors", Icon: Users },
  { value: "PAN INDIA", label: "Supply Network", Icon: MapPin },
  { value: "MULTIPLE", label: "Industrial Categories", Icon: BarChart3 },
  { value: "END-TO-END", label: "Procurement Support", Icon: Warehouse },
];

const REVEAL_TRANSITION_CLASS =
  "transform-gpu transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none";

const getRevealClassName = (isVisible) =>
  `${REVEAL_TRANSITION_CLASS} ${
    isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

// Keep the icon hover transition separate from the scroll-reveal transform.
// This prevents scroll animation timing from affecting hover-in or hover-out.
const STAT_ICON_INTERACTION_CLASS =
  "inline-flex transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none";

export default function AboutAndStatsSection() {
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsSectionVisible(true);
      return undefined;
    }

    const sectionVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        // Reset outside the viewport so the reveal can replay in either scroll direction.
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    sectionVisibilityObserver.observe(sectionElement);

    return () => {
      sectionVisibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_1.05fr_1.55fr] lg:items-center lg:gap-5"
    >
      <img
        src="/assets/Reliable Solutions for Tomorrow.png"
        alt="Larkin Traders industrial facility — Reliable Solutions for a Productive Tomorrow"
        className={`${getRevealClassName(isSectionVisible)} h-auto w-full rounded-sm object-cover`}
        style={{ transitionDelay: isSectionVisible ? "0ms" : "0ms" }}
        loading="lazy"
      />

      <div className="py-1">
        <p
          className={`${getRevealClassName(isSectionVisible)} text-[10px] font-extrabold tracking-[0.18em] text-[#07356f]`}
          style={{ transitionDelay: isSectionVisible ? "90ms" : "0ms" }}
        >
          {COMPANY_INTRODUCTION.eyebrow}
        </p>
        <h2
          className={`${getRevealClassName(isSectionVisible)} mt-1 font-heading text-3xl font-extrabold leading-[1.05] text-[#062b59]`}
          style={{ transitionDelay: isSectionVisible ? "170ms" : "0ms" }}
        >
          {COMPANY_INTRODUCTION.title}
        </h2>
        <p
          className={`${getRevealClassName(isSectionVisible)} mt-1.5 text-[12.5px] leading-[1.45] text-[#384d68] font-medium`}
          style={{ transitionDelay: isSectionVisible ? "250ms" : "0ms" }}
        >
          {COMPANY_INTRODUCTION.description}
        </p>
        <Link
          to="/about-us"
          className={`${getRevealClassName(isSectionVisible)} mt-2 inline-flex items-center gap-2 rounded-[3px] bg-[#fb5805] px-3 py-2 text-[10px] font-extrabold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e94c00] active:translate-y-0 active:scale-[0.98]`}
          style={{ transitionDelay: isSectionVisible ? "330ms" : "0ms" }}
        >
          {COMPANY_INTRODUCTION.linkLabel} <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-0 rounded-md bg-[#f2f8fd] px-2 py-3 sm:grid-cols-4 lg:px-1 lg:py-4">
        {COMPANY_STATISTICS.map(({ value, label, Icon }, index) => (
          <div
            key={value}
            className={`${getRevealClassName(isSectionVisible)} group flex min-h-[92px] flex-col items-center justify-center px-2 text-center ${index > 0 ? "border-l border-[#d6e5f1]" : ""}`}
            style={{
              transitionDelay: isSectionVisible
                ? `${120 + index * 90}ms`
                : "0ms",
            }}
          >
            <span className={STAT_ICON_INTERACTION_CLASS}>
              <Icon size={32} strokeWidth={2.5} className="text-[#0753aa]" />
            </span>
            <p className="mt-1.5 font-heading text-[16px] font-extrabold leading-none text-[#07356f]">
              {value}
            </p>
            <p className="mt-1 text-[10.5px] leading-tight text-[#19385f] font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
