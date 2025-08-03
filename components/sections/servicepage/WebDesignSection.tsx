"use client";
import React from "react";
import AnimatedHeading from "../AnimatedHeading";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useRouter } from "next/navigation";

export default function WebDesignSection() {
  const router = useRouter()
  return (
    <section className="bg-[#171817] min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-400 mb-2">✨ Website design with purpose.</p>
          {/* <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Results-Driven Web Design{" "}
          </h2> */}
            <AnimatedHeading
          text="Results-Driven WebDesign"
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        />
          <p className="text-gray-300 mb-8 leading-relaxed">
            Our website designs go beyond visuals—they’re crafted to captivate,
            communicate, and convert. We dive deep into understanding your
            brand’s personality and message, creating a design that’s as
            engaging as it is intuitive. With a unique blend of creativity and
            strategy, we design sites that look good and perform even better.
          </p>
          {/* <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
            Get Started
          </button> */}
          <AnimatedButton onClick={() => router.push("/service")} className="">
                      Get Started
                    </AnimatedButton>

        </div>

        {/* Right Video */}
        <div className="md:w-1/2 w-full rounded-xl  overflow-hidden shadow-lg bg-[#171817] ">
          <div className="bg-[#171817]  rounded-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[320px] md:max-h-[450px] rounded-md object-cover"
            >
              <source src="/assets/herovideos/670bf3be6040f597f238f1be_676188d827f1ff560c311601_ardell-desktop-socials-part-01-transcode.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
