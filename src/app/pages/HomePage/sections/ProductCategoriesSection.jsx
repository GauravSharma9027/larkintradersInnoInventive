// Purpose: Display all ten product category tiles in the same order as the client reference.
import { Link } from 'react-router';
import SectionHeading from '../../../../components/ui/SectionHeading.jsx';

const PRODUCT_CATEGORIES = [
  { label: 'Electrical & Electronics', image: 'product-category-tile-01-reference.png' },
  { label: 'Hardware & Fasteners', image: 'product-category-tile-02-reference.png' },
  { label: 'Pipes, Fittings & Flanges', image: 'product-category-tile-03-reference.png' },
  { label: 'Valves & Hydraulics', image: 'product-category-tile-04-reference.png' },
  { label: 'Safety Products', image: 'product-category-tile-05-reference.png' },
  { label: 'Motors', image: 'product-category-tile-06-reference.png' },
  { label: 'Housekeeping', image: 'product-category-tile-07-reference.png' },
  { label: 'Packaging Materials', image: 'product-category-tile-08-reference.png' },
  { label: 'Industrial Components', image: 'product-category-tile-09-reference.png' },
  { label: 'MRO & Consumables', image: 'product-category-tile-10-reference.png' },
];

export default function ProductCategoriesSection() {
  return (
    <section id="products" className="mt-4 rounded-sm bg-[#f4f9fd] px-2 py-2 sm:px-2.5">
      <SectionHeading title="OUR PRODUCT CATEGORIES" linkLabel="View All Products" linkTo="/products" />
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible lg:grid-cols-10">
        {PRODUCT_CATEGORIES.map(({ label, image }) => (
          <Link
            key={label}
            to="/products"
            aria-label={`Explore ${label}`}
            className="w-[88px] shrink-0 overflow-hidden rounded-[5px] border border-[#e1edf6] bg-white shadow-[0_1px_3px_rgba(12,55,91,0.04)] hover:border-[#7db7e6] sm:w-auto"
          >
            <img
              src={`/assets/${image}`}
              alt={label}
              className="block h-auto w-full object-contain"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
