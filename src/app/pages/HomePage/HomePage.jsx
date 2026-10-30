// Purpose: Compose the homepage sections in the same order as the approved client mockup.
import TopUtilityBar from './sections/TopUtilityBar.jsx';
import MainNavigation from './sections/MainNavigation.jsx';
import HeroSection from './sections/HeroSection.jsx';
import ServiceHighlightsSection from './sections/ServiceHighlightsSection.jsx';
import AboutAndStatsSection from './sections/AboutAndStatsSection.jsx';
import ProductCategoriesSection from './sections/ProductCategoriesSection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import MidPagePanelsSection from './sections/MidPagePanelsSection.jsx';
import ProcurementProcessSection from './sections/ProcurementProcessSection.jsx';
import ContactCtaSection from './sections/ContactCtaSection.jsx';
import SiteFooter from './sections/SiteFooter.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-body text-[#0b2f60]">
      <TopUtilityBar />
      <MainNavigation />
      <main className="mx-auto w-full max-w-[1440px]">
        <HeroSection />
        <div className="px-3 pt-3 sm:px-5">
          <ServiceHighlightsSection />
          <AboutAndStatsSection />
          <ProductCategoriesSection />
          <ServicesSection />
          <MidPagePanelsSection />
          <ProcurementProcessSection />
        </div>
        <ContactCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
