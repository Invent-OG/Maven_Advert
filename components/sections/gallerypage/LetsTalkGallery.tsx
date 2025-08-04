"use client";
import React from "react";
import AnimatedHeading from "../AnimatedHeading";
import WhiteButton from "@/components/ui/WhiteButton";
import router from "next/router";

function LetsTalkGallery() {
  return (
    <main className="relative w-full">
      {/* Sticky Section */}
      <section className="sticky top-0 h-screen bg-[#171817] z-10 flex flex-col items-start justify-start px-4 md:px-10 py-16 gap-6 md:gap-10">
        <h2 className="text-base md:text-sm text-neutral-300">
          ★ Partner with us for impactful results.
        </h2>
        <p className="text-neutral-300 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
          Let us craft a site that <br className="hidden sm:block" /> highlights
          your unique <br />
          work.
        </p>
      </section>

      {/* Overlapping Section */}
      <section className="relative -mt-10 md:-mt-20 min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center z-20">
        <AnimatedHeading
          text="Let's Get Started"
          fromColor="#d4d4d8"
          toColor="#000000"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        scrubSpeed={0.10}
startOffset={7}
endOffset={7}
        
        />

        <WhiteButton className="mt-6" onClick={() => router.push("/contact")}>
          Book A Call
        </WhiteButton>
      </section>
    </main>
  );
}

export default LetsTalkGallery;
