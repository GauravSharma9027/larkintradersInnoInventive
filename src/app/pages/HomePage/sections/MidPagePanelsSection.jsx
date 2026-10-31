// Purpose: Build the AI access, industries-served and company-advantages panels with editable HTML copy and iconography.
// Motion: restrained, bidirectional panel reveals, staggered advantage rows, and smooth icon-only hover feedback.
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  Factory,
  FlaskConical,
  HardHat,
  MoreHorizontal,
  Settings,
  Warehouse,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import SectionHeading from "../../../../components/ui/SectionHeading";

const AI_ACCESS_CONTENT = {
  title: "AI FACE AUTHENTICATION",
  highlight: "SMART ACCESS CONTROL FOR A SAFER TOMORROW",
  description:
    "Advanced AI face authentication solutions for industrial workplaces.",
  linkLabel: "Explore Our Products",
};

const INDUSTRIES_SERVED = [
  { label: "Manufacturing", Icon: Factory },
  { label: "Automobile", Icon: Car },
  { label: "Engineering", Icon: Settings },
  { label: "Electrical", Icon: Zap },
  { label: "Construction", Icon: HardHat },
  { label: "Industrial Projects", Icon: Building2 },
  { label: "Chemical & Paint", Icon: FlaskConical },
  { label: "Warehousing", Icon: Warehouse },
  { label: "Process Industries", Icon: FlaskConical },
  { label: "And More", Icon: MoreHorizontal },
];

const LARKIN_ADVANTAGES = [
  "Wide Product Range",
  "Trusted Vendor Network",
  "Competitive Procurement",
  "Quick Response",
  "PAN-India Supply",
  "Engineering Support",
];

const MOTION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const REVEAL_DURATION = "780ms";
const INTERACTION_DURATION = "650ms";

function getPanelRevealStyle(isVisible, delay = 0, direction = "up") {
  const initialTransform = {
    left: "translate3d(-16px, 0, 0)",
    up: "translate3d(0, 18px, 0)",
    right: "translate3d(16px, 0, 0)",
  }[direction];

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
    transitionProperty: "opacity, transform",
    transitionDuration: REVEAL_DURATION,
    transitionTimingFunction: MOTION_EASING,
    transitionDelay: isVisible ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
  };
}

export default function MidPagePanelsSection() {
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [hoveredIndustryIndex, setHoveredIndustryIndex] = useState(null);
  const [hoveredAdvantageIndex, setHoveredAdvantageIndex] = useState(null);

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
        // Reverse the reveal after leaving the viewport, so it replays in either direction.
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    sectionObserver.observe(sectionElement);
    return () => sectionObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-3 grid grid-cols-1 items-stretch gap-2.5 md:grid-cols-[1.05fr_1.3fr_0.95fr] md:gap-2"
    >
      {/* Left panel: subtle entrance from the left. */}
      <div
        className="h-full"
        style={getPanelRevealStyle(isSectionVisible, 0, "left")}
      >
        <article className="h-full overflow-hidden rounded-[4px] bg-[#f0f7fc] px-2.5 py-2">
          <SectionHeading title={AI_ACCESS_CONTENT.title} />
          <div className="mt-2 sm:grid sm:grid-cols-[1.05fr_0.95fr] sm:items-center sm:gap-2">
            <img
              src="/assets/ai-access-devices-photo-only.png"
              alt="AI face authentication access-control devices"
              className="sm:h-[112px] w-full object-contain mt-5"
              loading="lazy"
            />
            <div className="mt-3 sm:mt-0">
              <h3 className="font-heading text-[16px] sm:text-[13px] font-extrabold leading-[1.18] text-[#07356f]">
                {AI_ACCESS_CONTENT.highlight}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[10px] font-bold leading-[1.3] text-[#263e5d]">
                {AI_ACCESS_CONTENT.description}
              </p>
              <Link
                to="/solutions"
                className="mt-3 inline-flex items-center gap-1 text-[11px] sm:text-[11px] font-bold text-[#06418a] transition-colors duration-500 ease-out hover:text-[#f15a0a]"
              >
                {AI_ACCESS_CONTENT.linkLabel} <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Middle panel: icons scale gently on their own, without shifting the grid. */}
      <div
        className="h-full"
        style={getPanelRevealStyle(isSectionVisible, 110, "up")}
      >
        <article className="h-full rounded-[4px] bg-white px-2.5 py-2">
          <h2 className="font-heading text-[20px] font-extrabold leading-tight text-[#07356f] sm:text-[20px]">
            INDUSTRIES WE SERVE
          </h2>
          <p className="font-heading text-[18px] font-bold text-[#07356f]">
            Solutions for Every Industry
          </p>
          <div className="mt-5 sm:mt-2 grid grid-cols-3 sm:grid-cols-5 gap-x-1 gap-y-2">
            {INDUSTRIES_SERVED.map(({ label, Icon }, index) => {
              const isIndustryHovered = hoveredIndustryIndex === index;

              return (
                <div
                  key={label}
                  className="flex min-h-[47px] flex-col items-center justify-center gap-1 text-center"
                  onMouseEnter={() => setHoveredIndustryIndex(index)}
                  onMouseLeave={() => setHoveredIndustryIndex(null)}
                  onFocus={() => setHoveredIndustryIndex(index)}
                  onBlur={() => setHoveredIndustryIndex(null)}
                >
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      transform: isIndustryHovered
                        ? "translate3d(0, -1px, 0) scale(1.08)"
                        : "translate3d(0, 0, 0) scale(1)",
                      transition: `transform ${INTERACTION_DURATION} ${MOTION_EASING}`,
                      willChange: "transform",
                    }}
                  >
                    <Icon
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#07356f] w-10 h-10"
                    />
                  </span>
                  <span className="font-heading text-[14px] sm:text-[10px] leading-[1.1] text-[#18385e] sm:text-[10px] font-bold">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </article>
      </div>

      {/* Right panel: each advantage arrives in sequence; each row has a restrained independent hover response. */}
      <div
        className="h-full"
        style={getPanelRevealStyle(isSectionVisible, 220, "right")}
      >
        <article className="relative isolate h-full overflow-hidden rounded-[4px] p-5 sm:px-3 sm:py-2.5 text-white">
          <img
            src="/assets/why-larkin-factory-photo-only.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-center"
            loading="lazy"
          />
          <h2 className="font-heading text-[20px] sm:text-[17px] font-bold">
            WHY LARKIN TRADERS?
          </h2>
          <ul className="mt-2 space-y-[5px]">
            {LARKIN_ADVANTAGES.map((advantage, index) => {
              const isAdvantageHovered = hoveredAdvantageIndex === index;

              return (
                <li
                  key={advantage}
                  className="flex items-center gap-2 leading-tight text-white"
                  style={getPanelRevealStyle(
                    isSectionVisible,
                    320 + index * 95,
                    "left",
                  )}
                  onMouseEnter={() => setHoveredAdvantageIndex(index)}
                  onMouseLeave={() => setHoveredAdvantageIndex(null)}
                  onFocus={() => setHoveredAdvantageIndex(index)}
                  onBlur={() => setHoveredAdvantageIndex(null)}
                >
                  <span
                    className="inline-flex shrink-0"
                    style={{
                      transform: isAdvantageHovered ? "scale(1.1)" : "scale(1)",
                      transition: `transform ${INTERACTION_DURATION} ${MOTION_EASING}`,
                    }}
                  >
                    <CheckCircle2 size={15} fill="#70bb00" stroke="white" />
                  </span>
                  <span className="text-[13px] sm:text-[10px]">
                    {advantage}
                  </span>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
