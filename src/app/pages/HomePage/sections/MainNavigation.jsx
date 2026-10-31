// Purpose: Render the main brand navigation, responsive full-screen mobile menu and request-a-quote action.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";

const NAVIGATION_ITEMS = [
  { label: "HOME", to: "/", hasDropdown: false },
  { label: "ABOUT US", to: "/about-us", hasDropdown: false },
  { label: "PRODUCTS", to: "/products", hasDropdown: true },
  { label: "SERVICES", to: "/services", hasDropdown: true },
  { label: "SOLUTIONS", to: "/solutions", hasDropdown: true },
  { label: "INDUSTRIES", to: "/industries", hasDropdown: false },
  { label: "CONTACT US", to: "/contact-us", hasDropdown: false },
];

const NAVIGATION_LINK_CLASS =
  "inline-flex items-center gap-1 border-b-2 border-transparent px-1 py-2 text-[13px] font-extrabold text-[#092c5c] transition-colors hover:border-[#0d65bd] hover:text-[#0d65bd]";
const MOBILE_MENU_TRANSITION_DURATION = 300;

export default function MainNavigation() {
  const [mobileMenuState, setMobileMenuState] = useState("closed");
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuCloseButtonRef = useRef(null);
  const mobileMenuDialogRef = useRef(null);

  const isMobileMenuMounted = mobileMenuState !== "closed";
  const isMobileMenuVisible = mobileMenuState === "open";

  const openMobileMenu = useCallback(() => {
    setMobileMenuState("opening");
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuState((currentState) =>
      currentState === "closed" ? "closed" : "closing",
    );
  }, []);

  // Run the opening and closing transitions before mounting/unmounting the dialog.
  useEffect(() => {
    if (mobileMenuState === "opening") {
      const animationFrame = window.requestAnimationFrame(() => {
        setMobileMenuState("open");
      });

      return () => window.cancelAnimationFrame(animationFrame);
    }

    if (mobileMenuState === "closing") {
      const closeTimer = window.setTimeout(() => {
        setMobileMenuState("closed");
      }, MOBILE_MENU_TRANSITION_DURATION);

      return () => window.clearTimeout(closeTimer);
    }

    return undefined;
  }, [mobileMenuState]);

  // Lock the page behind the full-screen menu and provide keyboard accessibility.
  useEffect(() => {
    if (!isMobileMenuMounted) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    mobileMenuCloseButtonRef.current?.focus();

    const handleDialogKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        keyboardEvent.preventDefault();
        closeMobileMenu();
        return;
      }

      if (keyboardEvent.key !== "Tab" || !mobileMenuDialogRef.current) {
        return;
      }

      const focusableElements = mobileMenuDialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        keyboardEvent.preventDefault();
        return;
      }

      const focusIsInsideDialog = mobileMenuDialogRef.current.contains(
        document.activeElement,
      );

      if (
        keyboardEvent.shiftKey &&
        (document.activeElement === firstFocusableElement ||
          !focusIsInsideDialog)
      ) {
        keyboardEvent.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !keyboardEvent.shiftKey &&
        (document.activeElement === lastFocusableElement ||
          !focusIsInsideDialog)
      ) {
        keyboardEvent.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.removeEventListener("keydown", handleDialogKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [isMobileMenuMounted, closeMobileMenu]);

  return (
    <header className="relative z-30 border-b border-slate-100 bg-white shadow-[0_2px_7px_rgba(4,36,75,0.08)]">
      <div className="mx-auto flex min-h-16.5 max-w-360 items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Larkin Traders home" className="shrink-0">
          <img
            src="/assets/Larkin Traders Corporate Logo.png"
            alt="Larkin Traders — Your Partner in Industrial Productivity"
            className="h-auto w-42 object-contain sm:w-51.25 lg:w-50"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          {NAVIGATION_ITEMS.map((navigationItem) => (
            <NavLink
              key={navigationItem.label}
              to={navigationItem.to}
              end={navigationItem.to === "/"}
              className={({ isActive }) =>
                `${NAVIGATION_LINK_CLASS} ${isActive ? "border-[#0d65bd] text-[#0d65bd]" : ""}`
              }
            >
              {navigationItem.label}
              {navigationItem.hasDropdown ? (
                <ChevronDown size={11} strokeWidth={2.5} />
              ) : null}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact-us"
          className="hidden shrink-0 items-center gap-2 rounded-[4px] bg-[#fb5805] px-6 py-3 text-[10px] font-extrabold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e94c00] hover:shadow-md active:translate-y-0 active:scale-[0.98] lg:inline-flex"
        >
          REQUEST A QUOTE <ArrowRight size={15} />
        </Link>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          aria-label={
            isMobileMenuMounted
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuMounted}
          aria-controls="mobile-navigation-dialog"
          onClick={isMobileMenuMounted ? closeMobileMenu : openMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#062f67] transition-all duration-200 hover:scale-105 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d65bd] focus-visible:ring-offset-2 lg:hidden"
        >
          {isMobileMenuMounted ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isMobileMenuMounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-[#062f67] transition-opacity duration-300 ease-out motion-reduce:transition-none ${isMobileMenuVisible ? "opacity-100" : "opacity-0"}`}
              onClick={closeMobileMenu}
            >
              <div
                ref={mobileMenuDialogRef}
                id="mobile-navigation-dialog"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={`relative flex h-full min-h-[100dvh] w-full flex-col overflow-y-auto overscroll-contain bg-gradient-to-br from-[#062f67] via-[#073d79] to-[#031d43] transition-transform duration-300 ease-out motion-reduce:transition-none ${isMobileMenuVisible ? "translate-y-0" : "translate-y-3"}`}
                onClick={(clickEvent) => clickEvent.stopPropagation()}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(24,160,230,0.22),transparent_48%)]" />

                <div className="relative flex min-h-20 items-center justify-between border-b border-white/15 px-5 py-4 sm:px-8">
                  <Link
                    to="/"
                    aria-label="Larkin Traders home"
                    onClick={closeMobileMenu}
                    className="inline-flex rounded-md bg-white px-3 py-1.5"
                  >
                    <img
                      src="/assets/Larkin Traders Corporate Logo.png"
                      alt="Larkin Traders"
                      className="h-auto w-36 object-contain"
                    />
                  </Link>

                  <button
                    ref={mobileMenuCloseButtonRef}
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={closeMobileMenu}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-all duration-200 hover:rotate-90 hover:bg-white/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#062f67]"
                  >
                    <X size={23} strokeWidth={2.2} />
                  </button>
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-8 sm:px-10"
                >
                  <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#54c8f2] sm:text-xs">
                    Navigate Larkin Traders
                  </div>

                  <div className="flex flex-col">
                    {NAVIGATION_ITEMS.map((navigationItem, navigationIndex) => (
                      <NavLink
                        key={navigationItem.label}
                        to={navigationItem.to}
                        end={navigationItem.to === "/"}
                        onClick={closeMobileMenu}
                        style={{
                          transitionDelay: isMobileMenuVisible
                            ? `${navigationIndex * 25}ms`
                            : "0ms",
                        }}
                        className={({ isActive }) =>
                          `group flex items-center justify-between border-b border-white/15 py-3.5 text-lg font-extrabold tracking-[0.025em] transition-all duration-200 hover:translate-x-1 hover:text-[#55c9f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:py-4 sm:text-2xl ${isActive ? "text-[#55c9f3]" : "text-white"} ${isMobileMenuVisible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`
                        }
                      >
                        <span>{navigationItem.label}</span>
                        {navigationItem.hasDropdown ? (
                          <ChevronDown
                            size={18}
                            strokeWidth={2.2}
                            className="text-white/60 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-[#55c9f3]"
                          />
                        ) : (
                          <ArrowRight
                            size={18}
                            strokeWidth={2.2}
                            className="-translate-x-1 text-white/40 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-[#55c9f3] group-hover:opacity-100"
                          />
                        )}
                      </NavLink>
                    ))}
                  </div>

                  <Link
                    to="/contact-us"
                    onClick={closeMobileMenu}
                    className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-[4px] bg-[#fb5805] px-6 py-3 text-xs font-extrabold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e94c00] hover:shadow-xl active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#062f67] sm:max-w-xs"
                  >
                    REQUEST A QUOTE
                    <ArrowRight size={16} />
                  </Link>
                </nav>

                <div className="relative border-t border-white/15 px-6 py-4 text-center text-[10px] font-semibold tracking-wide text-white/60 sm:px-10">
                  Your Partner in Industrial Productivity
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
