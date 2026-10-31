// Purpose: Render a consistent section title and optional view-all route.
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function SectionHeading({ title, linkLabel, linkTo = '/' }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <h2 className="font-heading text-[17px] font-extrabold leading-tight text-[#07356f] sm:text-[20px]">
        {title}
      </h2>
      {linkLabel ? (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#06418a] hover:text-[#f15a0a] sm:text-xs"
        >
          {linkLabel}
          <ArrowRight size={13} strokeWidth={2.2} />
        </Link>
      ) : null}
    </div>
  );
}
