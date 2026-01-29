import DistributionSection from "../components/Industries/DistributionSection";
import IndustryCTA from "../components/Industries/IndustryCTA";
import IndustryHero from "../components/Industries/IndustryHero";
import IndustrySubnav from "../components/Industries/IndustrySubnav";
import ManufacturingSection from "../components/Industries/ManufacturingSection";
import RetailSection from "../components/Industries/RetailSection";


const Industries = () => {
  return (
    <>
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
