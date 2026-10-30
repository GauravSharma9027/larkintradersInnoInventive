// Purpose: Display the exact seven-stage procurement process graphic from the client mockup.

const PROCUREMENT_STEPS = [
  'Send Requirement',
  'Requirement Analysis',
  'Vendor Identification',
  'Quote Comparison',
  'Order Confirmation',
  'Quality Check',
  'Delivery',
];

export default function ProcurementProcessSection() {
  return (
    <section aria-label="Our procurement process" className="mt-3">
      <img
        src="/assets/procurement-process-reference.png"
        alt={`Our procurement process: ${PROCUREMENT_STEPS.join(', ')}`}
        className="hidden h-auto w-full md:block"
        loading="lazy"
      />
      <div className="grid grid-cols-2 gap-2 rounded-md bg-[#f5f9fd] p-3 sm:grid-cols-4 md:hidden">
        <h2 className="col-span-full font-heading text-base font-extrabold text-[#07356f]">OUR PROCUREMENT PROCESS</h2>
        {PROCUREMENT_STEPS.map((step, index) => (
          <div key={step} className="flex items-start gap-2 rounded border border-[#e1edf6] bg-white p-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#178ed2] text-[11px] font-bold text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pt-0.5 text-[11px] font-semibold leading-tight text-[#17395f]">{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
