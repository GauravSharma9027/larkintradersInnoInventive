// Purpose: Display the slim contact and location information bar above the main navigation.
import { Mail, MapPin, Phone } from 'lucide-react';

const UTILITY_CONTACT_DETAILS = {
  phoneNumber: '+91 93453 47405',
  emailAddress: 'purchase@larkintraders.com',
  location: 'Chennai, Tamil Nadu, India',
  tagline: 'Your Partner in Industrial Productivity',
};

export default function TopUtilityBar() {
  return (
    <div className="bg-[#012d61] px-4 py-1.5 text-[10px] font-semibold text-white sm:px-8 sm:text-[11px]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-1 sm:flex-row">
        <p className="hidden sm:block">{UTILITY_CONTACT_DETAILS.tagline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a className="inline-flex items-center gap-1.5 hover:text-sky-200" href={`tel:${UTILITY_CONTACT_DETAILS.phoneNumber.replaceAll(' ', '')}`}>
            <Phone size={12} fill="currentColor" />
            {UTILITY_CONTACT_DETAILS.phoneNumber}
          </a>
          <a className="inline-flex items-center gap-1.5 hover:text-sky-200" href={`mailto:${UTILITY_CONTACT_DETAILS.emailAddress}`}>
            <Mail size={12} fill="currentColor" />
            {UTILITY_CONTACT_DETAILS.emailAddress}
          </a>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <MapPin size={12} fill="currentColor" />
            {UTILITY_CONTACT_DETAILS.location}
          </span>
        </div>
      </div>
    </div>
  );
}
