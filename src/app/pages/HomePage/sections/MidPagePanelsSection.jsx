// Purpose: Build the AI access, industries-served and company-advantages panels with editable HTML copy and iconography.
import {
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  Factory,
  FlaskConical,
  HardHat,
  MoreHorizontal,
  Settings,
  Warehouse,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import SectionHeading from "../../../../components/ui/SectionHeading";

const AI_ACCESS_CONTENT = {
  title: "AI FACE AUTHENTICATION",
  highlight: "SMART ACCESS CONTROL FOR A SAFER TOMORROW",
  description:
    "Advanced AI face authentication solutions for industrial workplaces.",
  linkLabel: "Explore Our Products",
};

const INDUSTRIES_SERVED = [
  { label: "Manufacturing", Icon: Factory },
  { label: "Automobile", Icon: Car },
  { label: "Engineering", Icon: Settings },
  { label: "Electrical", Icon: Zap },
  { label: "Construction", Icon: HardHat },
  { label: "Industrial Projects", Icon: Building2 },
  { label: "Chemical & Paint", Icon: FlaskConical },
  { label: "Warehousing", Icon: Warehouse },
  { label: "Process Industries", Icon: FlaskConical },
  { label: "And More", Icon: MoreHorizontal },
];

const LARKIN_ADVANTAGES = [
  "Wide Product Range",
  "Trusted Vendor Network",
  "Competitive Procurement",
  "Quick Response",
  "PAN-India Supply",
  "Engineering Support",
];

export default function MidPagePanelsSection() {
  return (
    <section className="mt-3 grid grid-cols-1 items-stretch gap-2.5 md:grid-cols-[1.05fr_1.3fr_0.95fr] md:gap-2">
      <article className="overflow-hidden rounded-[4px] bg-[#f0f7fc] px-2.5 py-2">
        <SectionHeading title={AI_ACCESS_CONTENT.title} />
        <div className="mt-2 grid grid-cols-[1.05fr_0.95fr] items-center gap-2">
          <img
            src="/assets/ai-access-devices-photo-only.png"
            alt="AI face authentication access-control devices"
            className="h-[112px] w-full object-contain"
            loading="lazy"
          />
          <div>
            <h3 className="font-heading text-[13px] font-extrabold leading-[1.18] text-[#07356f]">
              {AI_ACCESS_CONTENT.highlight}
            </h3>
            <p className="mt-2 text-[10px] font-bold leading-[1.3] text-[#263e5d]">
              {AI_ACCESS_CONTENT.description}
            </p>
            <Link
              to="/solutions"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#06418a] hover:text-[#f15a0a]"
            >
              {AI_ACCESS_CONTENT.linkLabel} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </article>

      <article className="rounded-[4px] bg-white px-2.5 py-2">
       
        <h2 className="font-heading text-[17px] font-extrabold leading-tight text-[#07356f] sm:text-[20px]">
          INDUSTRIES WE SERVE
        </h2>
        <p className=" font-heading text-[18px] font-bold text-[#07356f]">
          Solutions for Every Industry
        </p>
        <div className="mt-2 grid grid-cols-5 gap-x-1 gap-y-2">
          {INDUSTRIES_SERVED.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex min-h-[47px] flex-col items-center justify-center gap-1 text-center"
            >
              <Icon size={23} strokeWidth={2.2} className="text-[#07356f]" />
              <span className="font-heading text-[10px] leading-[1.1] text-[#18385e] sm:text-[10px] font-bold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className="relative isolate  overflow-hidden rounded-[4px] px-3 py-2.5 text-white">
        <img
          src="/assets/why-larkin-factory-photo-only.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 h-full right-0 -z-20 h-full w-full  object-cover object-center"
          loading="lazy"
        />
        {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#06284c_0%,#06284c_50%,rgba(6,40,76,0.82)_67%,rgba(6,40,76,0.25)_100%)]" /> */}
        <h2 className="font-heading text-[17px] font-bold">
          WHY LARKIN TRADERS?
        </h2>
        <ul className="mt-2 space-y-[5px]">
          {LARKIN_ADVANTAGES.map((advantage) => (
            <li
              key={advantage}
              className="flex items-center gap-2 text-[10px] leading-tight text-white"
            >
              <CheckCircle2
                size={15}
                fill="#70bb00"
                stroke="white"
                className="shrink-0"
              />
              <span className="text-[10px]">{advantage}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
