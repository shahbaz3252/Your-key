import CinematicHero from "./components/cinematic/CinematicHero";

import PropertyForSale from "./components/PropertyForSale";
import TowersUnderConstruction from "./components/TowersUnderConstruction";
import RentProperties from "./components/RentProperties";
import InvestmentAnalytics from "./components/InvestmentAnalytics";
import CovetedLocations from "./components/CovetedLocations";
import BespokeServices from "./components/BespokeServices";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";
import PropertyValuation from "./components/PropertyValuation";


export default function Home() {
  return (
    <main>

      <CinematicHero />

      <PropertyForSale />

      <TowersUnderConstruction />

      <RentProperties />

      <InvestmentAnalytics />

      <CovetedLocations />

      <BespokeServices />

      <ReviewsSection />

      <FAQSection />

      <PropertyValuation />

    </main>
  );
}