// Purpose: Render the main brand navigation, responsive menu and request-a-quote action.
import { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const NAVIGATION_ITEMS = [
  { label: 'HOME', to: '/', hasDropdown: false },
  { label: 'ABOUT US', to: '/about-us', hasDropdown: false },
  { label: 'PRODUCTS', to: '/products', hasDropdown: true },
  { label: 'SERVICES', to: '/services', hasDropdown: true },
  { label: 'SOLUTIONS', to: '/solutions', hasDropdown: true },
  { label: 'INDUSTRIES', to: '/industries', hasDropdown: false },
  { label: 'CONTACT US', to: '/contact-us', hasDropdown: false },
];

const NAVIGATION_LINK_CLASS = 'inline-flex items-center gap-1 border-b-2 border-transparent px-1 py-2 text-[10px] font-extrabold text-[#092c5c] transition-colors hover:border-[#0d65bd] hover:text-[#0d65bd]';

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-slate-100 bg-white shadow-[0_2px_7px_rgba(4,36,75,0.08)]">
      <div className="mx-auto flex min-h-[66px] max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Larkin Traders home" className="shrink-0">
          <img
            src="/assets/brand-logo-lockup-header-transparent.png"
            alt="Larkin Traders — Your Partner in Industrial Productivity"
            className="h-auto w-[176px] object-contain sm:w-[205px] lg:w-[230px]"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          {NAVIGATION_ITEMS.map((navigationItem) => (
            <NavLink
              key={navigationItem.label}
              to={navigationItem.to}
              end={navigationItem.to === '/'}
              className={({ isActive }) => `${NAVIGATION_LINK_CLASS} ${isActive ? 'border-[#0d65bd] text-[#0d65bd]' : ''}`}
            >
              {navigationItem.label}
              {navigationItem.hasDropdown ? <ChevronDown size={11} strokeWidth={2.5} /> : null}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact-us"
          className="hidden shrink-0 items-center gap-2 rounded-[4px] bg-[#fb5805] px-3 py-3 text-[10px] font-extrabold text-white shadow-sm hover:bg-[#e94c00] lg:inline-flex"
        >
          REQUEST A QUOTE <ArrowRight size={15} />
        </Link>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((menuOpen) => !menuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#062f67] lg:hidden"
        >
          {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <nav aria-label="Mobile navigation" className="border-t border-slate-100 bg-white px-5 py-3 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {NAVIGATION_ITEMS.map((navigationItem) => (
              <NavLink
                key={navigationItem.label}
                to={navigationItem.to}
                end={navigationItem.to === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center justify-between border-b border-slate-100 py-3 text-xs font-bold ${isActive ? 'text-[#0d65bd]' : 'text-[#092c5c]'}`}
              >
                {navigationItem.label}
                {navigationItem.hasDropdown ? <ChevronDown size={13} /> : null}
              </NavLink>
            ))}
            <Link
              to="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded bg-[#fb5805] px-4 py-3 text-xs font-extrabold text-white"
            >
              REQUEST A QUOTE <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
