// Purpose: Reproduce the three adjacent information panels for AI access, industries and company advantages.
import { Link } from 'react-router';

const HOMEPAGE_INFORMATION_PANELS = [
  {
    title: 'AI Face Authentication',
    image: 'ai-face-authentication-panel-reference.png',
    alt: 'AI face authentication and smart access control for safer industrial workplaces',
    destination: '/solutions',
  },
  {
    title: 'Industries We Serve',
    image: 'industries-we-serve-panel-reference.png',
    alt: 'Industries served: manufacturing, automobile, engineering, electrical, construction, industrial projects, chemical and paint, warehousing and process industries',
    destination: '/industries',
  },
  {
    title: 'Why Larkin Traders',
    image: 'why-larkin-panel-reference.png',
    alt: 'Why Larkin Traders: wide product range, trusted vendor network, competitive procurement, quick response, PAN-India supply and engineering support',
    destination: '/about-us',
  },
];

export default function MidPagePanelsSection() {
  return (
    <section className="mt-3 grid grid-cols-1 items-stretch gap-2.5 md:grid-cols-[1.05fr_1.35fr_0.9fr] md:gap-2">
      {HOMEPAGE_INFORMATION_PANELS.map(({ title, image, alt, destination }) => (
        <Link
          key={title}
          to={destination}
          aria-label={`Learn more: ${title}`}
          className="block overflow-hidden rounded-[4px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0877c5]"
        >
          <img
            src={`/assets/${image}`}
            alt={alt}
            className="block h-auto w-full object-cover"
            loading="lazy"
          />
        </Link>
      ))}
    </section>
  );
}
