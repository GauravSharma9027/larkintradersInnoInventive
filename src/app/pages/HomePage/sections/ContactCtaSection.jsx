// Purpose: Display real HTML CTA copy and reusable action buttons over a photo-only handshake background.
// Includes a bidirectional scroll reveal and smooth, independent button hover/press motion.
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "../../../../components/ui/Button.jsx";

const CONTACT_CTA = {
  whatsappNumber: "919345347405",
  message:
    "Hello Larkin Traders, I would like to know more about your products and services.",
  headline: "Let’s Build a Stronger, More Productive Tomorrow",
  description:
    "Get in touch with us for your product, service or automation requirements.",
};

const REVEAL_TRANSITION =
  "transform 820ms cubic-bezier(0.22, 1, 0.36, 1), opacity 820ms cubic-bezier(0.22, 1, 0.36, 1)";

function getRevealStyle(isVisible, delay = 0, reduceMotion = false) {
  if (reduceMotion) {
    return {
      opacity: 1,
      transform: "none",
      transition: "none",
    };
  }

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
    transition: REVEAL_TRANSITION,
    transitionDelay: `${isVisible ? delay : Math.max(0, 180 - delay)}ms`,
  };
}

// The button's transform is managed independently from the scroll-reveal wrapper.
// This keeps hover-in and hover-out smooth without competing transform utilities.
function ButtonMotion({ children, reduceMotion = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const transform = reduceMotion
    ? "none"
    : isPressed
      ? "translate3d(0, 0, 0) scale(0.985)"
      : isHovered
        ? "translate3d(0, -2px, 0) scale(1.01)"
        : "translate3d(0, 0, 0) scale(1)";

  const resetInteraction = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  return (
    <span
      className="inline-flex"
      style={{
        transform,
        transformOrigin: "center",
        transition: reduceMotion
          ? "none"
          : "transform 460ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={resetInteraction}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={resetInteraction}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          setIsPressed(true);
        }
      }}
      onKeyUp={() => setIsPressed(false)}
    >
      {children}
    </span>
  );
}

export default function ContactCtaSection() {
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const whatsappUrl = `https://wa.me/${CONTACT_CTA.whatsappNumber}?text=${encodeURIComponent(CONTACT_CTA.message)}`;

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return undefined;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const shouldReduceMotion = motionPreference.matches;
    setPrefersReducedMotion(shouldReduceMotion);

    if (shouldReduceMotion || !("IntersectionObserver" in window)) {
      setIsSectionVisible(true);
      return undefined;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        // Leaving the viewport reverses the reveal; re-entering replays it.
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
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
      aria-label="Contact Larkin Traders"
      className="relative isolate mt-3 py-6 overflow-hidden bg-[#032e5c] text-white"
    >
      <img
        src="/assets/cta-handshake-photo-only.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-y-0 left-[37%] -z-20 hidden h-full w-[34%] object-cover object-center md:block"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(100deg,#032e5c_0%,#064a7e_38%,rgba(3,46,92,0.18)_62%,#032e5c_100%)] md:block" />

      <div className="mx-auto flex min-h-[74px] max-w-[1440px] flex-col justify-between gap-3 px-5 py-4 sm:px-7 md:h-[74px] md:min-h-0 md:flex-row md:items-center md:gap-4 md:px-[2.7%] md:py-0">
        <div className="max-w-[610px]">
          <h2
            className="font-heading text-[18px] font-medium leading-[1.1] sm:text-xl md:text-[22px]"
            style={getRevealStyle(isSectionVisible, 0, prefersReducedMotion)}
          >
            {CONTACT_CTA.headline}
          </h2>
          <p
            className="mt-1 text-[11px] leading-[1.25] text-white/95 sm:text-[16px]"
            style={getRevealStyle(isSectionVisible, 110, prefersReducedMotion)}
          >
            {CONTACT_CTA.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 md:gap-3">
          <span
            className="inline-flex"
            style={getRevealStyle(isSectionVisible, 210, prefersReducedMotion)}
          >
            <ButtonMotion reduceMotion={prefersReducedMotion}>
              <Button to="/contact-us" size="large">
                REQUEST A QUOTE <ArrowRight size={14} />
              </Button>
            </ButtonMotion>
          </span>

          <span
            className="inline-flex"
            style={getRevealStyle(isSectionVisible, 300, prefersReducedMotion)}
          >
            <ButtonMotion reduceMotion={prefersReducedMotion}>
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                size="large"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </Button>
            </ButtonMotion>
          </span>
        </div>
      </div>
    </section>
  );
}
