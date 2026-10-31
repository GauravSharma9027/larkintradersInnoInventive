// Purpose: Display real HTML CTA copy and reusable action buttons over a photo-only handshake background.
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "../../../../components/ui/Button.jsx";

const CONTACT_CTA = {
  whatsappNumber: "919345347405",
  message:
    "Hello Larkin Traders, I would like to know more about your products and services.",
  headline: "Let’s Build a Stronger, More Productive Tomorrow",
  description:
    "Get in touch with us for your product, service or automation requirements.",
};

export default function ContactCtaSection() {
  const whatsappUrl = `https://wa.me/${CONTACT_CTA.whatsappNumber}?text=${encodeURIComponent(CONTACT_CTA.message)}`;

  return (
    <section
      aria-label="Contact Larkin Traders"
      className="relative isolate mt-3 py-6 overflow-hidden bg-[#032e5c] text-white"
    >
      <img
        src="/assets/cta-handshake-photo-only.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-y-0 left-[37%] -z-20 hidden h-full w-[34%] object-cover object-center md:block"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(100deg,#032e5c_0%,#064a7e_38%,rgba(3,46,92,0.18)_62%,#032e5c_100%)] md:block" />
      <div className="mx-auto flex min-h-[74px] max-w-[1440px] flex-col justify-between gap-3 px-5 py-4 sm:px-7 md:h-[74px] md:min-h-0 md:flex-row md:items-center md:gap-4 md:px-[2.7%] md:py-0">
        <div className="max-w-[610px]">
          <h2 className="font-heading text-[18px] font-medium leading-[1.1] sm:text-xl md:text-[22px]">
            {CONTACT_CTA.headline}
          </h2>
          <p className="mt-1 text-[11px] leading-[1.25] text-white/95 sm:text-[16px]">
            {CONTACT_CTA.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 md:gap-3">
          <Button to="/contact-us" size="large">
            REQUEST A QUOTE <ArrowRight size={14} />
          </Button>
          <Button
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            variant="whatsapp"
            size="large"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </Button>
        </div>
      </div>
    </section>
  );
}
