import Clients from "@/components/sections/Clients";
import ClientSuccessSection from "@/components/sections/ClientSuccessSection";
import HeroImages from "@/components/sections/HeroImages";
import Home from "@/components/sections/Home"; // ✅ default import

export default function HomePage() {
  return (
    <>
      <Home />
      <HeroImages/>
      <Clients/>
      <ClientSuccessSection/>
    </>
  );
}
