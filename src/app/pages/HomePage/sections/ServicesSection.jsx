// Purpose: Show the eight engineering and machine service image tiles from the supplied mockup.
import { Link } from 'react-router';
import SectionHeading from '../../../../components/ui/SectionHeading.jsx';

const ENGINEERING_SERVICES = [
  { label: 'CNC / VMC Machine Services', image: 'service-tile-01-reference.png' },
  { label: 'Mechanical Service', image: 'service-tile-02-reference.png' },
  { label: 'Electrical Service', image: 'service-tile-03-reference.png' },
  { label: 'Preventive Maintenance', image: 'service-tile-04-reference.png' },
  { label: 'Retrofit & Upgradation', image: 'service-tile-05-reference.png' },
  { label: 'Spare Parts Support', image: 'service-tile-06-reference.png' },
  { label: 'Machine Erection', image: 'service-tile-07-reference.png' },
  { label: 'Machine Buying & Selling', image: 'service-tile-08-reference.png' },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="mt-4 rounded-sm bg-[#f4f9fd] px-2 py-2 sm:px-2.5"
    >
      <SectionHeading
        title="OUR SERVICES"
        linkLabel="View All Services"
        linkTo="/services"
      />
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
        {ENGINEERING_SERVICES.map(({ label, image }) => (
          <Link
            key={label}
            to="/services"
            aria-label={label}
            className="w-[118px] h-full shrink-0  overflow-hidden rounded-[10px] p-0 m-0 shadow-[0_1px_3px_rgba(12,55,91,0.12)] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0877c5] sm:w-auto"
          >
            <img
              src={`/assets/${image}`}
              alt={label}
              className="block h-full w-full object-cover overflow-hidden rounded-[10px]"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
