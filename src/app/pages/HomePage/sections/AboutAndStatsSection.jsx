// Purpose: Present the company introduction alongside the four key business proof points.
import { ArrowRight, BarChart3, MapPin, Users, Warehouse } from 'lucide-react';
import { Link } from 'react-router';

const COMPANY_INTRODUCTION = {
  eyebrow: 'ABOUT LARKIN TRADERS',
  title: 'Your Trusted Industrial Solutions Partner',
  description: 'Larkin Traders Pvt Ltd provides industrial products, procurement support, engineering services and industrial solutions for manufacturing and engineering requirements.',
  linkLabel: 'More About Us',
};

const COMPANY_STATISTICS = [
  { value: '500+', label: 'Verified Vendors', Icon: Users },
  { value: 'PAN INDIA', label: 'Supply Network', Icon: MapPin },
  { value: 'MULTIPLE', label: 'Industrial Categories', Icon: BarChart3 },
  { value: 'END-TO-END', label: 'Procurement Support', Icon: Warehouse },
];

export default function AboutAndStatsSection() {
  return (
    <section
      id="about"
      className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_1.05fr_1.55fr] lg:items-center lg:gap-5"
    >
      <img
        src="/assets/Reliable Solutions for Tomorrow.png"
        alt="Larkin Traders industrial facility — Reliable Solutions for a Productive Tomorrow"
        className="h-auto w-full rounded-sm object-cover"
        loading="lazy"
      />

      <div className="py-1">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-[#07356f]">
          {COMPANY_INTRODUCTION.eyebrow}
        </p>
        <h2 className="mt-1 font-heading text-3xl font-extrabold leading-[1.05] text-[#062b59]">
          {COMPANY_INTRODUCTION.title}
        </h2>
        <p className="mt-1.5 text-[12.5px] leading-[1.45] text-[#384d68] font-medium">
          {COMPANY_INTRODUCTION.description}
        </p>
        <Link
          to="/about-us"
          className="mt-2 inline-flex items-center gap-2 rounded-[3px] bg-[#fb5805] px-3 py-2 text-[10px] font-extrabold text-white hover:bg-[#e94c00]"
        >
          {COMPANY_INTRODUCTION.linkLabel} <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-0 rounded-md bg-[#f2f8fd] px-2 py-3 sm:grid-cols-4 lg:px-1 lg:py-4">
        {COMPANY_STATISTICS.map(({ value, label, Icon }, index) => (
          <div
            key={value}
            className={`flex min-h-[92px] flex-col items-center justify-center px-2 text-center ${index > 0 ? "border-l border-[#d6e5f1]" : ""}`}
          >
            <Icon size={32} strokeWidth={2.5} className="text-[#0753aa]" />
            <p className="mt-1.5 font-heading text-[16px] font-extrabold leading-none text-[#07356f]">
              {value}
            </p>
            <p className="mt-1 text-[10.5px] leading-tight text-[#19385f] font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
