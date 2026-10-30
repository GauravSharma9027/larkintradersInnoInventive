// Purpose: Reproduce the supplied homepage hero artwork and provide a readable mobile layout.
import { ArrowRight, Settings, ShieldCheck, ChartNoAxesColumnIncreasing } from 'lucide-react';
import { Link } from 'react-router';

const HERO_CONTENT = {
  eyebrow: 'INDUSTRIAL SUPPLY  |  ENGINEERING SERVICES  |  AUTOMATION SOLUTIONS',
  headlineFirst: 'YOUR INDUSTRIAL REQUIREMENT.',
  headlineSecond: 'OUR COMPLETE SOLUTION.',
  description: 'Larkin Traders Pvt Ltd provides industrial products, engineering services and automation solutions for manufacturing, engineering and industrial applications.',
  primaryAction: 'REQUEST A QUOTE',
  secondaryAction: 'EXPLORE OUR SOLUTIONS',
  proofPoints: [
    { label: 'Quality Products', Icon: Settings },
    { label: 'Reliable Services', Icon: ShieldCheck },
    { label: 'Better Productivity', Icon: ChartNoAxesColumnIncreasing },
  ],
};

export default function HeroSection() {
  return (
    <section aria-label="Larkin Traders industrial solutions" className="relative w-full overflow-hidden bg-[#022141]">
      <div className="relative hidden w-full md:block">
        <img
          src="/assets/hero-banner-full-reference.png"
          alt="Your industrial requirement. Our complete solution. Industrial CNC machinery and factory equipment."
          className="block h-auto w-full"
          fetchPriority="high"
        />
        <Link
          to="/contact-us"
          aria-label="Request a quote"
          className="absolute left-[4.5%] top-[70.5%] h-[12%] w-[15%] rounded-sm outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        />
        <Link
          to="/solutions"
          aria-label="Explore our solutions"
          className="absolute left-[21.2%] top-[70.5%] h-[12%] w-[18.5%] rounded-sm outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        />
      </div>

      <div className="mx-auto flex max-w-[620px] flex-col gap-4 px-5 py-7 text-white md:hidden">
        <p className="text-[9px] font-bold tracking-[0.19em] text-sky-200">{HERO_CONTENT.eyebrow}</p>
        <div>
          <h1 className="font-heading text-[30px] font-extrabold leading-[1.04] tracking-tight">
            {HERO_CONTENT.headlineFirst}
            <span className="mt-1 block text-[#26a8ec]">{HERO_CONTENT.headlineSecond}</span>
          </h1>
          <p className="mt-3 max-w-[450px] text-sm leading-5 text-white/90">{HERO_CONTENT.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/contact-us" className="inline-flex items-center gap-2 rounded bg-[#fb5805] px-4 py-3 text-[11px] font-extrabold text-white">
            {HERO_CONTENT.primaryAction} <ArrowRight size={14} />
          </Link>
          <Link to="/solutions" className="inline-flex items-center gap-2 rounded border border-white/80 px-4 py-3 text-[11px] font-extrabold text-white">
            {HERO_CONTENT.secondaryAction} <ArrowRight size={14} />
          </Link>
        </div>
        <img
          src="/assets/hero-machine-and-factory-reference.png"
          alt="Industrial CNC machine in a modern factory"
          className="w-full rounded-md object-cover"
        />
        <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold">
          {HERO_CONTENT.proofPoints.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-1.5 text-white">
              <Icon size={17} /> {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
