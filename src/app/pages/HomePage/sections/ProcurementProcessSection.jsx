// Purpose: Render the seven procurement milestones with live text, vector icons and separate step numbers.
// Includes smooth, bidirectional staggered reveals and restrained per-step hover interactions.
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Search,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import SectionHeading from "../../../../components/ui/SectionHeading";

const PROCUREMENT_STEPS = [
  { label: "Send Requirement", Icon: FileText },
  { label: "Requirement Analysis", Icon: Search },
  { label: "Vendor Identification", Icon: Users },
  { label: "Quote Comparison", Icon: ClipboardList },
  { label: "Order Confirmation", Icon: CheckCircle2 },
  { label: "Quality Check", Icon: Settings },
  { label: "Delivery", Icon: Truck },
];

const REVEAL_DURATION = 780;
const HOVER_DURATION = 650;
const SMOOTH_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ProcurementProcessSection() {
  const sectionRef = useRef(null);
  const [visibleStepIndices, setVisibleStepIndices] = useState(() => new Set());
  const [hoveredStepIndex, setHoveredStepIndex] = useState(null);
  const [isMotionReduced, setIsMotionReduced] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return undefined;

    const stepElements = sectionElement.querySelectorAll(
      "[data-procurement-step-reveal]",
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsMotionReduced(true);
      setVisibleStepIndices(
        new Set(PROCUREMENT_STEPS.map((_, index) => index)),
      );
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setVisibleStepIndices(
        new Set(PROCUREMENT_STEPS.map((_, index) => index)),
      );
      return undefined;
    }

    const stepVisibilityObserver = new IntersectionObserver(
      (entries) => {
        setVisibleStepIndices((currentVisibleIndices) => {
          const nextVisibleIndices = new Set(currentVisibleIndices);
          let hasChanged = false;

          entries.forEach((entry) => {
            const stepIndex = Number(
              entry.target.dataset.procurementStepReveal,
            );

            if (entry.isIntersecting && !nextVisibleIndices.has(stepIndex)) {
              nextVisibleIndices.add(stepIndex);
              hasChanged = true;
            } else if (
              !entry.isIntersecting &&
              nextVisibleIndices.has(stepIndex)
            ) {
              nextVisibleIndices.delete(stepIndex);
              hasChanged = true;
            }
          });

          return hasChanged ? nextVisibleIndices : currentVisibleIndices;
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    stepElements.forEach((stepElement) =>
      stepVisibilityObserver.observe(stepElement),
    );

    return () => {
      stepVisibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our procurement process"
      className="mt-3 pb-1"
    >
      <SectionHeading title="OUR PROCUREMENT PROCESS" />

      <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4 md:grid-cols-7 md:gap-1">
        {PROCUREMENT_STEPS.map(({ label, Icon }, index) => {
          const isStepVisible = visibleStepIndices.has(index);
          const isStepHovered = hoveredStepIndex === index;

          return (
            <div
              key={label}
              data-procurement-step-reveal={index}
              className="h-full min-w-0 transform-gpu motion-reduce:transform-none motion-reduce:transition-none"
              style={{
                opacity: isStepVisible ? 1 : 0,
                transform: isStepVisible
                  ? "translate3d(0, 0, 0) scale(1)"
                  : "translate3d(0, 22px, 0) scale(0.975)",
                transition: isMotionReduced
                  ? "none"
                  : `opacity ${REVEAL_DURATION}ms ${SMOOTH_EASING}, transform ${REVEAL_DURATION}ms ${SMOOTH_EASING}`,
                transitionDelay: isStepVisible
                  ? `${index * 85}ms`
                  : `${(PROCUREMENT_STEPS.length - 1 - index) * 35}ms`,
              }}
            >
              <div
                className="mt-2 sm:mt-0 relative flex min-h-[55px] flex-col items-start gap-4 pl-6 sm:flex-row sm:items-center sm:gap-2 md:gap-1.5"
                onPointerEnter={() => setHoveredStepIndex(index)}
                onPointerLeave={() =>
                  setHoveredStepIndex((currentIndex) =>
                    currentIndex === index ? null : currentIndex,
                  )
                }
                style={{
                  transform:
                    isStepHovered && !isMotionReduced
                      ? "translate3d(0, -3px, 0)"
                      : "translate3d(0, 0, 0)",
                  transition: isMotionReduced
                    ? "none"
                    : `transform ${HOVER_DURATION}ms ${SMOOTH_EASING}`,
                }}
              >
                <div
                  className="flex h-[60px] w-[60px] sm:h-[40px] sm:w-[40px] shrink-0 items-center justify-center rounded-full bg-[#218fd1] text-white"
                  style={{
                    transform:
                      isStepHovered && !isMotionReduced
                        ? "scale(1.075) rotate(-2deg)"
                        : "scale(1) rotate(0deg)",
                    transition: isMotionReduced
                      ? "none"
                      : `transform ${HOVER_DURATION}ms ${SMOOTH_EASING}, box-shadow ${HOVER_DURATION}ms ${SMOOTH_EASING}`,
                    boxShadow:
                      isStepHovered && !isMotionReduced
                        ? "0 7px 16px rgba(7, 83, 170, 0.20)"
                        : "none",
                  }}
                >
                  <Icon size={20} strokeWidth={2.1} />
                </div>

                <div className="min-w-0 px-1.5 sm:px-0">
                  <p className="font-heading sm:text-[14px] font-extrabold leading-none text-[#07356f]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-heading text-wrap sm:max-w-5 text-[15px] sm:text-[13px] font-bold leading-[1.15] text-[#17395f]">
                    {label}
                  </p>
                </div>

                {index < PROCUREMENT_STEPS.length - 1 ? (
                  <ArrowRight
                    size={18}
                    strokeWidth={2.2}
                    className="absolute -right-1 top-1/2 hidden text-[#078de0] md:block"
                    style={{
                      transform:
                        isStepHovered && !isMotionReduced
                          ? "translate3d(3px, -50%, 0)"
                          : "translate3d(0, -50%, 0)",
                      transition: isMotionReduced
                        ? "none"
                        : `transform ${HOVER_DURATION}ms ${SMOOTH_EASING}`,
                    }}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
