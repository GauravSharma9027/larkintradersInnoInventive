// Purpose: Reproduce the bottom blue contact banner and connect its quote and WhatsApp actions.
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';

const CONTACT_CTA = {
  whatsappNumber: '919345347405',
  message: 'Hello Larkin Traders, I would like to know more about your products and services.',
};

export default function ContactCtaSection() {
  const whatsappUrl = `https://wa.me/${CONTACT_CTA.whatsappNumber}?text=${encodeURIComponent(CONTACT_CTA.message)}`;

  return (
    <section aria-label="Contact Larkin Traders" className="relative mt-3 overflow-hidden bg-[#063365]">
      <div className="relative hidden md:block">
        <img src="/assets/cta-banner-reference.png" alt="Let's Build a Stronger, More Productive Tomorrow. Get in touch with us for your product, service or automation requirements." className="block h-auto w-full" loading="lazy" />
        <Link to="/contact-us" aria-label="Request a quote" className="absolute left-[67.3%] top-[19%] h-[62%] w-[16%] rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
        <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Larkin Traders on WhatsApp" className="absolute left-[84.8%] top-[19%] h-[62%] w-[13%] rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" />
      </div>
      <div className="flex flex-col gap-3 bg-[linear-gradient(105deg,#052c5a,#07518c)] px-5 py-5 text-white md:hidden">
        <div>
          <h2 className="font-heading text-xl font-extrabold">Let’s Build a Stronger, More Productive Tomorrow</h2>
          <p className="mt-1 text-xs leading-5 text-white/90">Get in touch with us for your product, service or automation requirements.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/contact-us" className="inline-flex items-center gap-2 rounded bg-[#fb5805] px-4 py-2.5 text-[11px] font-extrabold text-white">
            REQUEST A QUOTE <ArrowRight size={14} />
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded bg-[#18b943] px-4 py-2.5 text-[11px] font-extrabold text-white">
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
