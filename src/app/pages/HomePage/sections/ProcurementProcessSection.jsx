// Purpose: Render the seven procurement milestones with live text, vector icons and separate step numbers.
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

export default function ProcurementProcessSection() {
  return (
    <section aria-label="Our procurement process" className="mt-3 pb-1">
      <SectionHeading title="OUR PROCUREMENT PROCESS" />
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4 md:grid-cols-7 md:gap-1">
        {PROCUREMENT_STEPS.map(({ label, Icon }, index) => (
          <div
            key={label}
            className="relative flex min-h-[55px] items-center gap-2 md:gap-1.5 pl-6"
          >
            <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-[#218fd1] text-white">
              <Icon size={20} strokeWidth={2.1} />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-[14px] font-extrabold leading-none text-[#07356f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-heading text-wrap max-w-5 text-[13px] font-bold leading-[1.15] text-[#17395f]">
                {label}
              </p>
            </div>
            {index < PROCUREMENT_STEPS.length - 1 ? (
              <ArrowRight
                size={18}
                strokeWidth={2.2}
                className="absolute -right-1 top-1/2 hidden -translate-y-1/2 text-[#078de0] md:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
