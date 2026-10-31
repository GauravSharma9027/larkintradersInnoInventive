// Purpose: Show the four key business capability cards directly below the hero section.
// Includes restrained, bidirectional scroll reveals and polished, accessible card interactions.
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Cpu,
  Settings,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";

const SERVICE_HIGHLIGHTS = [
  {
    title: "INDUSTRIAL SUPPLY",
    description:
      "Wide range of industrial products sourced from verified vendors.",
    linkLabel: "View Products",
    route: "/products",
    Icon: ShoppingCart,
    iconColor: "bg-[#0877c5]",
  },
  {
    title: "ENGINEERING SERVICES",
    description: "CNC, VMC and conventional machine service and maintenance.",
    linkLabel: "View Services",
    route: "/services",
    Icon: Settings,
    iconColor: "bg-[#fa5b0b]",
  },
  {
    title: "AUTOMATION SOLUTIONS",
    description: "Industrial automation and machine integration solutions.",
    linkLabel: "View Solutions",
    route: "/solutions",
    Icon: Cpu,
    iconColor: "bg-[#4d980b]",
  },
  {
    title: "SMART ACCESS CONTROL",
    description:
      "AI face authentication for safer and smarter industrial workplaces.",
    linkLabel: "Know More",
    route: "/solutions",
    Icon: UserRound,
    iconColor: "bg-[#58128f]",
  },
];

const CARD_STAGGER_INTERVAL = 110;

export default function ServiceHighlightsSection() {
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

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        // Reset after leaving the viewport so the reveal reverses and replays
        // naturally while scrolling both down and back up the page.
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    sectionObserver.observe(sectionElement);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our core capabilities"
      className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {SERVICE_HIGHLIGHTS.map(
        ({ title, description, linkLabel, route, Icon, iconColor }, index) => (
          <div
            key={title}
            className={`h-full transform-gpu transition-[opacity,transform] duration-[760ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transform-none motion-reduce:transition-none ${
              isSectionVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-7 scale-[0.985] opacity-0"
            }`}
            style={{
              // Stagger applies only to the reveal wrapper, never to hover feedback.
              transitionDelay: isSectionVisible
                ? `${index * CARD_STAGGER_INTERVAL}ms`
                : `${(SERVICE_HIGHLIGHTS.length - 1 - index) * 45}ms`,
            }}
          >
            <article className="group relative flex h-full min-h-[116px] items-start gap-3 overflow-hidden rounded-md border border-[#e4eff8] bg-[#f3f9fe] p-3 shadow-[0_1px_4px_rgba(16,61,100,0.04)] transform-gpu transition-[transform,translate,scale,box-shadow,border-color,background-color] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:scale-[1.012] hover:border-[#c8deef] hover:bg-white hover:shadow-[0_14px_30px_rgba(16,61,100,0.12)] focus-within:-translate-y-1 focus-within:scale-[1.012] focus-within:border-[#c8deef] focus-within:bg-white focus-within:shadow-[0_14px_30px_rgba(16,61,100,0.12)] active:translate-y-0 active:scale-[0.997] motion-reduce:transform-none motion-reduce:transition-none">
              {/* A restrained highlight appears on hover without changing card layout. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#0d65bd]/45 to-transparent opacity-0 transition-[transform,scale,opacity] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100 motion-reduce:transition-none"
              />

              <div
                className={`relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full text-white shadow-inner transform-gpu transition-[transform,rotate,scale,box-shadow] duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.045] group-hover:rotate-[-2deg] group-hover:shadow-[0_6px_15px_rgba(16,61,100,0.16)] group-focus-within:scale-[1.045] group-focus-within:rotate-[-2deg] motion-reduce:transform-none motion-reduce:transition-none ${iconColor}`}
              >
                <Icon size={27} strokeWidth={2.3} aria-hidden="true" />
              </div>

              <div className="relative z-10 min-w-0 pt-1">
                <h2 className="font-heading text-[13px] font-extrabold leading-tight text-[#07356f]">
                  {title}
                </h2>
                <p className="mt-1.5 text-[11px] leading-[1.45] text-[#243c5d]">
                  {description}
                </p>
                <Link
                  to={route}
                  className="group/link mt-2 inline-flex items-center gap-1 rounded-[2px] text-[11px] font-bold text-[#06418a] outline-none transition-[color,transform,translate] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-[#f15a0a] focus-visible:ring-2 focus-visible:ring-[#0d65bd]/50 focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:transition-none"
                >
                  {linkLabel}
                  <ArrowRight
                    size={13}
                    className="transform-gpu transition-[transform,translate] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </article>
          </div>
        ),
      )}
    </section>
  );
}
