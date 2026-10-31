// Purpose: Display all ten product categories with icon-only PNGs and actual HTML labels.
// Scroll reveal is bidirectional and staggered per card; hover motion uses explicit transform transitions.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import SectionHeading from "../../../../components/ui/SectionHeading.jsx";

const PRODUCT_CATEGORIES = [
  { label: "Electrical & Electronics", icon: "product-icon-01.png" },
  { label: "Hardware & Fasteners", icon: "product-icon-02.png" },
  { label: "Pipes, Fittings & Flanges", icon: "product-icon-03.png" },
  { label: "Valves & Hydraulics", icon: "product-icon-04.png" },
  { label: "Safety Products", icon: "product-icon-05.png" },
  { label: "Motors", icon: "product-icon-06.png" },
  { label: "Housekeeping", icon: "product-icon-07.png" },
  { label: "Packaging Materials", icon: "product-icon-08.png" },
  { label: "Industrial Components", icon: "product-icon-09.png" },
  { label: "MRO & Consumables", icon: "product-icon-10.png" },
];

const CARD_STAGGER_INTERVAL = 45;
const SMOOTH_INTERACTION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const SCROLL_REVEAL_TRANSITION = `opacity 850ms ${SMOOTH_INTERACTION_EASING}, transform 850ms ${SMOOTH_INTERACTION_EASING}`;
const CARD_HOVER_TRANSITION = `transform 700ms ${SMOOTH_INTERACTION_EASING}, box-shadow 700ms ${SMOOTH_INTERACTION_EASING}, border-color 700ms ${SMOOTH_INTERACTION_EASING}`;
const ICON_HOVER_TRANSITION = `transform 700ms ${SMOOTH_INTERACTION_EASING}`;
const HIGHLIGHT_TRANSITION = `transform 700ms ${SMOOTH_INTERACTION_EASING}, opacity 450ms ease`;
const LABEL_TRANSITION = `color 450ms ${SMOOTH_INTERACTION_EASING}`;

export default function ProductCategoriesSection() {
  const sectionRef = useRef(null);
  const [visibleCardIndices, setVisibleCardIndices] = useState(() => new Set());
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return undefined;

    const cardElements = sectionElement.querySelectorAll(
      "[data-product-card-reveal]",
    );

    const reducedMotionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      reducedMotionPreference.matches ||
      !("IntersectionObserver" in window)
    ) {
      setPrefersReducedMotion(reducedMotionPreference.matches);
      setVisibleCardIndices(
        new Set(PRODUCT_CATEGORIES.map((_, index) => index)),
      );
      return undefined;
    }

    const cardVisibilityObserver = new IntersectionObserver(
      (entries) => {
        setVisibleCardIndices((currentVisibleIndices) => {
          const nextVisibleIndices = new Set(currentVisibleIndices);
          let hasChanged = false;

          entries.forEach((entry) => {
            const cardIndex = Number(entry.target.dataset.productCardReveal);

            if (entry.isIntersecting && !nextVisibleIndices.has(cardIndex)) {
              nextVisibleIndices.add(cardIndex);
              hasChanged = true;
            } else if (
              !entry.isIntersecting &&
              nextVisibleIndices.has(cardIndex)
            ) {
              nextVisibleIndices.delete(cardIndex);
              hasChanged = true;
            }
          });

          return hasChanged ? nextVisibleIndices : currentVisibleIndices;
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    cardElements.forEach((cardElement) =>
      cardVisibilityObserver.observe(cardElement),
    );

    return () => {
      cardVisibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="mt-4 rounded-sm bg-[#f4f9fd] px-2 py-2 sm:px-2.5"
    >
      <SectionHeading
        title="OUR PRODUCT CATEGORIES"
        linkLabel="View All Products"
        linkTo="/products"
      />

      <div className="-mx-1 grid grid-cols-2 gap-1.5 px-1 sm:grid-cols-5 lg:grid-cols-10">
        {PRODUCT_CATEGORIES.map(({ label, icon }, index) => {
          const isCardVisible = visibleCardIndices.has(index);
          const isCardHovered = hoveredCardIndex === index;

          return (
            <div
              key={label}
              data-product-card-reveal={index}
              className="h-full"
              style={{
                // Use the actual transform property so reveal motion works in both Tailwind v3 and v4.
                opacity: isCardVisible ? 1 : 0,
                transform: isCardVisible
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 28px, 0) scale(0.96)",
                transition: prefersReducedMotion
                  ? "none"
                  : SCROLL_REVEAL_TRANSITION,
                transitionDelay: prefersReducedMotion
                  ? "0ms"
                  : isCardVisible
                    ? `${index * CARD_STAGGER_INTERVAL}ms`
                    : `${(PRODUCT_CATEGORIES.length - 1 - index) * 25}ms`,
                willChange: prefersReducedMotion
                  ? "auto"
                  : "transform, opacity",
              }}
            >
              <Link
                to="/products"
                aria-label={`Explore ${label}`}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onFocus={() => setHoveredCardIndex(index)}
                onBlur={() => setHoveredCardIndex(null)}
                className="group relative flex h-full min-h-23.75 flex-col items-center justify-between overflow-hidden rounded-[5px] border border-[#e1edf6] bg-white px-1.5 py-4 shadow-[0_1px_3px_rgba(12,55,91,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d65bd]"
                style={{
                  // Inline transform + transition avoids Tailwind-version differences between
                  // the legacy transform property and the newer translate/scale properties.
                  transform: isCardHovered
                    ? "translate3d(0, -5px, 0) scale(1.025)"
                    : "translate3d(0, 0, 0) scale(1)",
                  transition: prefersReducedMotion
                    ? "none"
                    : CARD_HOVER_TRANSITION,
                  borderColor: isCardHovered ? "#7db7e6" : "#e1edf6",
                  boxShadow: isCardHovered
                    ? "0 12px 26px rgba(12,55,91,0.12)"
                    : "0 1px 3px rgba(12,55,91,0.04)",
                  willChange: prefersReducedMotion ? "auto" : "transform",
                }}
              >
                {/* Subtle top-edge highlight; transform itself is transitioned explicitly. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 right-4 top-0 h-[2px] origin-left rounded-full bg-[#0d65bd]"
                  style={{
                    transform: isCardHovered ? "scaleX(1)" : "scaleX(0)",
                    opacity: isCardHovered ? 1 : 0,
                    transition: prefersReducedMotion
                      ? "none"
                      : HIGHLIGHT_TRANSITION,
                  }}
                />

                <img
                  src={`/assets/${icon}`}
                  alt=""
                  aria-hidden="true"
                  className="max-w-10.5 object-contain"
                  style={{
                    transform: isCardHovered
                      ? "scale(1.09) rotate(3deg)"
                      : "scale(1) rotate(0deg)",
                    transition: prefersReducedMotion
                      ? "none"
                      : ICON_HOVER_TRANSITION,
                  }}
                  loading="lazy"
                />

                <span
                  className="flex min-h-7.5 items-start pt-2 text-center font-heading text-[12px] font-bold leading-[1.15] sm:text-[12px]"
                  style={{
                    color: isCardHovered ? "#0d65bd" : "#092c5c",
                    transition: prefersReducedMotion
                      ? "none"
                      : LABEL_TRANSITION,
                  }}
                >
                  {label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
