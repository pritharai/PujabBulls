import DistributionSection from "../components/Industries/DistributionSection";
import IndustryCTA from "../components/Industries/IndustryCTA";
import IndustryHero from "../components/Industries/IndustryHero";
import IndustrySubnav from "../components/Industries/IndustrySubnav";
import ManufacturingSection from "../components/Industries/ManufacturingSection";
import RetailSection from "../components/Industries/RetailSection";
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";


const Industries = () => {
  const meta = staticRouteMeta["/industries"];

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        prerenderHint={meta.prerender}
      />
      <IndustryHero />
      <IndustrySubnav />
      <RetailSection />
      <DistributionSection />
      <ManufacturingSection />
      <IndustryCTA />
    </>
  );
};

export default Industries;
