import Clients from "@/components/sections/Clients";
import ClientSuccessSection from "@/components/sections/ClientSuccessSection";
import Gallery from "@/components/sections/Gallery";
import HeroImages from "@/components/sections/HeroImages";
import HeroVideos from "@/components/sections/HeroVideos";
import Home from "@/components/sections/Home"; // ✅ default import
import HowSection from "@/components/sections/HowSection";
import LetsTalk from "@/components/sections/LetsTalk";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Home />
      <HeroImages/>
      <HowSection/>
      <Clients/>
    <ClientSuccessSection />
    <HeroVideos/>
    <Gallery/>
    <WhyChooseUs/>
    <LetsTalk/>
    </>
  );
}
