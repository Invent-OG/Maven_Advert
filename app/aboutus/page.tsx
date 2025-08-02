import React from "react";
import AboutHero from "@/components/sections/aboutuspage/AboutHero";
import AboutSecond from "@/components/sections/aboutuspage/AboutSecond";
import AboutThird from "@/components/sections/aboutuspage/AboutThird";
import OurResult from "@/components/sections/aboutuspage/OurResult";
import WhitePage from "@/components/sections/aboutuspage/WhitePage";
import AboutCTA from "@/components/sections/aboutuspage/AboutCTA";

function aboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSecond />
      <AboutThird />
      {/* <OurResult/> */}

      <WhitePage />
      {/* <AboutCTA/> */}
    </>
  );
}

export default aboutPage;
