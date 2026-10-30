// Purpose: Provide a minimal routed placeholder for non-homepage links while only the homepage is in scope.
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function PlaceholderPage({ pageTitle }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f9fd] px-5 py-12 font-body">
      <section className="w-full max-w-xl rounded-xl border border-[#dfebf5] bg-white p-8 text-center shadow-sm">
        <img src="/assets/brand-logo-lockup-header-transparent.png" alt="Larkin Traders" className="mx-auto mb-7 w-52" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b67b7]">Larkin Traders</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#062b59]">{pageTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">This page is outside the current homepage demo scope. The homepage is the only fully designed page in this delivery.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded bg-[#fb5805] px-4 py-3 text-xs font-bold text-white hover:bg-[#e94c00]">
          <ArrowLeft size={14} /> Back to Homepage <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
