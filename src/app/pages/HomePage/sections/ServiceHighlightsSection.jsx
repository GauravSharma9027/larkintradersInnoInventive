// Purpose: Show the four key business capability cards directly below the hero section.
import { ArrowRight, Cpu, Settings, ShoppingCart, UserRound } from 'lucide-react';
import { Link } from 'react-router';

const SERVICE_HIGHLIGHTS = [
  {
    title: 'INDUSTRIAL SUPPLY',
    description: 'Wide range of industrial products sourced from verified vendors.',
    linkLabel: 'View Products',
    route: '/products',
    Icon: ShoppingCart,
    iconColor: 'bg-[#0877c5]',
  },
  {
    title: 'ENGINEERING SERVICES',
    description: 'CNC, VMC and conventional machine service and maintenance.',
    linkLabel: 'View Services',
    route: '/services',
    Icon: Settings,
    iconColor: 'bg-[#fa5b0b]',
  },
  {
    title: 'AUTOMATION SOLUTIONS',
    description: 'Industrial automation and machine integration solutions.',
    linkLabel: 'View Solutions',
    route: '/solutions',
    Icon: Cpu,
    iconColor: 'bg-[#4d980b]',
  },
  {
    title: 'SMART ACCESS CONTROL',
    description: 'AI face authentication for safer and smarter industrial workplaces.',
    linkLabel: 'Know More',
    route: '/solutions',
    Icon: UserRound,
    iconColor: 'bg-[#58128f]',
  },
];

export default function ServiceHighlightsSection() {
  return (
    <section aria-label="Our core capabilities" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICE_HIGHLIGHTS.map(({ title, description, linkLabel, route, Icon, iconColor }) => (
        <article key={title} className="flex min-h-[116px] items-start gap-3 rounded-md border border-[#e4eff8] bg-[#f3f9fe] p-3 shadow-[0_1px_4px_rgba(16,61,100,0.04)]">
          <div className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full text-white shadow-inner ${iconColor}`}>
            <Icon size={27} strokeWidth={2.3} />
          </div>
          <div className="min-w-0 pt-1">
            <h2 className="font-heading text-[13px] font-extrabold leading-tight text-[#07356f]">{title}</h2>
            <p className="mt-1.5 text-[11px] leading-[1.45] text-[#243c5d]">{description}</p>
            <Link to={route} className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#06418a] hover:text-[#f15a0a]">
              {linkLabel} <ArrowRight size={13} />
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
