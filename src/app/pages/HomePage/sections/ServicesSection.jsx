// Purpose: Show the eight engineering and machine service image tiles from the supplied mockup.
// Each tile has an independently replayable, bidirectional scroll reveal and a separate smooth hover interaction.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import SectionHeading from "../../../../components/ui/SectionHeading.jsx";

const ENGINEERING_SERVICES = [
  {
    label: "CNC / VMC Machine Services",
    image: "service-tile-01-reference.png",
  },
  { label: "Mechanical Service", image: "service-tile-02-reference.png" },
  { label: "Electrical Service", image: "service-tile-03-reference.png" },
  { label: "Preventive Maintenance", image: "service-tile-04-reference.png" },
  { label: "Retrofit & Upgradation", image: "service-tile-05-reference.png" },
  { label: "Spare Parts Support", image: "service-tile-06-reference.png" },
  { label: "Machine Erection", image: "service-tile-07-reference.png" },
  { label: "Machine Buying & Selling", image: "service-tile-08-reference.png" },
];

const SCROLL_REVEAL_DURATION = "duration-[760ms]";
const SCROLL_REVEAL_EASING = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const HOVER_TRANSITION = "duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [visibleServiceCards, setVisibleServiceCards] = useState(
    () => new Set(),
  );

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Keep every service visible when reduced motion is requested or
    // IntersectionObserver is unavailable in the browser.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setVisibleServiceCards(
        new Set(ENGINEERING_SERVICES.map((_, index) => index)),
      );
      return undefined;
    }

    const serviceCardElements = sectionElement.querySelectorAll(
      "[data-service-card-index]",
    );

    const serviceCardObserver = new IntersectionObserver(
      (entries) => {
        setVisibleServiceCards((currentVisibleCards) => {
          const nextVisibleCards = new Set(currentVisibleCards);

          entries.forEach((entry) => {
            const cardIndex = Number(entry.target.dataset.serviceCardIndex);

            if (entry.isIntersecting) {
              nextVisibleCards.add(cardIndex);
            } else {
              // Reset after leaving the viewport so scrolling in either
              // direction replays the reveal animation.
              nextVisibleCards.delete(cardIndex);
            }
          });

          return nextVisibleCards;
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    serviceCardElements.forEach((serviceCardElement) => {
      serviceCardObserver.observe(serviceCardElement);
    });

    return () => {
      serviceCardObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="mt-4 rounded-sm bg-[#f4f9fd] px-2 py-2 sm:px-2.5"
    >
      <SectionHeading
        title="OUR SERVICES"
        linkLabel="View All Services"
        linkTo="/services"
      />

      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
        {ENGINEERING_SERVICES.map(({ label, image }, index) => {
          const isCardVisible = visibleServiceCards.has(index);

          return (
            <div
              key={label}
              data-service-card-index={index}
              className={`h-full w-[218px] shrink-0 transform-gpu will-change-transform sm:w-auto ${SCROLL_REVEAL_DURATION} ${SCROLL_REVEAL_EASING} motion-reduce:transform-none motion-reduce:transition-none ${
                isCardVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-6 scale-[0.985] opacity-0"
              }`}
              style={{
                transitionProperty: "opacity, transform",
                transitionDelay: isCardVisible ? `${index * 55}ms` : "0ms",
              }}
            >
              <Link
                to="/services"
                aria-label={label}
                className={`group relative block h-full w-full overflow-hidden rounded-[10px] p-0 shadow-[0_1px_3px_rgba(12,55,91,0.12)] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0877c5] transform-gpu transition-transform ${HOVER_TRANSITION} hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none`}
              >
                <img
                  src={`/assets/${image}`}
                  alt={label}
                  className={`block h-full w-full rounded-[10px] object-cover transform-gpu transition-transform ${HOVER_TRANSITION} group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none`}
                  loading="lazy"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
