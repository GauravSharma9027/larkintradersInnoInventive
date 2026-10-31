// Purpose: Display all ten product categories with icon-only PNGs and actual HTML labels.
import { Link } from "react-router";
import SectionHeading from "../../../../components/ui/SectionHeading.jsx";

const PRODUCT_CATEGORIES = [
  { label: "Electrical & Electronics", icon: "product-icon-01.png" },
  { label: "Hardware & Fasteners", icon: "product-icon-02.png" },
  { label: "Pipes, Fittings & Flanges", icon: "product-icon-03.png" },
  { label: "Valves & Hydraulics", icon: "product-icon-04.png" },
  { label: "Safety Products", icon: "product-icon-05.png" },
  { label: "Motors", icon: "product-icon-06.png" },
  { label: "Housekeeping", icon: "product-icon-07.png" },
  { label: "Packaging Materials", icon: "product-icon-08.png" },
  { label: "Industrial Components", icon: "product-icon-09.png" },
  { label: "MRO & Consumables", icon: "product-icon-10.png" },
];

export default function ProductCategoriesSection() {
  return (
    <section
      id="products"
      className="mt-4 rounded-sm bg-[#f4f9fd] px-2 py-2 sm:px-2.5"
    >
      <SectionHeading
        title="OUR PRODUCT CATEGORIES"
        linkLabel="View All Products"
        linkTo="/products"
      />
      <div className="-mx-1 grid grid-cols-2 gap-1.5 px-1 sm:grid-cols-5 lg:grid-cols-10">
        {PRODUCT_CATEGORIES.map(({ label, icon }) => (
          <Link
            key={label}
            to="/products"
            aria-label={`Explore ${label}`}
            className="flex min-h-23.75 flex-col items-center justify-between rounded-[5px] border border-[#e1edf6] bg-white px-1.5 py-4 shadow-[0_1px_3px_rgba(12,55,91,0.04)] hover:border-[#7db7e6]"
          >
            <img
              src={`/assets/${icon}`}
              alt=""
              aria-hidden="true"
              className=" max-w-10.5 object-contain"
              loading="lazy"
            />
            <span className="pt-2 flex min-h-7.5 items-start text-center font-heading text-[12px] font-bold leading-[1.15] text-[#092c5c] sm:text-[12px]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
