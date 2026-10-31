// Purpose: Render the footer brand, quick links, contact details, social links and closing tagline.
import { LucideYoutube, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router';

const FOOTER_QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Industries', to: '/industries' },
  { label: 'Products', to: '/products' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Services', to: '/services' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
];

const FOOTER_CONTACT_DETAILS = {
  phoneNumber: '+91 93453 47405',
  purchaseEmail: 'purchase@larkintraders.com',
  secondaryEmail: 'larkintraders10@gmail.com',
  address: 'Chennai, Tamil Nadu, India',
};

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-5 py-5 sm:grid-cols-2 lg:grid-cols-[1.05fr_1.35fr_1.9fr_1.1fr_1.2fr] lg:gap-4 lg:px-6">
        <div className="flex items-center justify-center lg:justify-start">
          <img
            src="/assets/footer-brand-area-transparent.png"
            alt="Larkin Traders — Your Partner in Industrial Productivity"
            className="w-[125px] object-contain sm:w-[135px]"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="mb-2 text-[12px] font-extrabold text-[#061e48]">Quick Links</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {FOOTER_QUICK_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="text-[10px] text-[#182d4c] hover:text-[#0b67b7]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-slate-200 lg:pl-7">
          <h2 className="mb-2 text-[12px] font-extrabold text-[#061e48]">Contact Us</h2>
          <div className="space-y-1.5 text-[10px] text-[#182d4c]">
            <a href={`tel:${FOOTER_CONTACT_DETAILS.phoneNumber.replaceAll(' ', '')}`} className="flex items-center gap-2 hover:text-[#0b67b7]">
              <Phone size={12} fill="currentColor" /> {FOOTER_CONTACT_DETAILS.phoneNumber}
            </a>
            <a href={`mailto:${FOOTER_CONTACT_DETAILS.purchaseEmail}`} className="flex items-center gap-2 hover:text-[#0b67b7]">
              <Mail size={12} fill="currentColor" /> {FOOTER_CONTACT_DETAILS.purchaseEmail}
            </a>
            <a href={`mailto:${FOOTER_CONTACT_DETAILS.secondaryEmail}`} className="flex items-center gap-2 hover:text-[#0b67b7]">
              <Mail size={12} fill="currentColor" /> {FOOTER_CONTACT_DETAILS.secondaryEmail}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={12} fill="currentColor" /> {FOOTER_CONTACT_DETAILS.address}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-slate-200 lg:pl-7">
          <h2 className="mb-3 text-[12px] font-extrabold text-[#061e48]">Follow Us</h2>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-7 w-7 items-center justify-center rounded bg-[#087bb8] text-white hover:bg-[#06659a]">
              <span className="text-sm font-black">in</span>
            </a>
            {/* <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-7 w-7 items-center justify-center rounded bg-[#e62117] text-white hover:bg-[#bd1b13]">
              <LucideYoutube size={17} fill="white" />
            </a> */}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 sm:col-span-2 sm:border-t-0 sm:pt-0 lg:col-span-1 lg:border-l lg:border-slate-200 lg:pl-7">
          <p className="border-l-[3px] border-[#58a51a] pl-3 font-heading text-[14px] font-extrabold uppercase leading-[1.35] tracking-wide text-[#082c60]">
            Quality Service.<br />Longer Machine Life.<br />Higher Productivity.
          </p>
          <div className="mt-2 h-[3px] w-20 bg-gradient-to-r from-[#69b92c] via-[#0d8ed4] to-[#6c238a]" />
        </div>
      </div>

      <div className="bg-[#073b73] px-4 py-3 text-[10px] text-white sm:px-6">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-1 text-center sm:flex-row sm:text-left">
          <p>© 2024 Larkin Traders Pvt Ltd. All Rights Reserved.</p>
          <p>Machines Keep Moving. <strong>Your Business Keep Growing.</strong></p>
        </div>
      </div>
    </footer>
  );
}
