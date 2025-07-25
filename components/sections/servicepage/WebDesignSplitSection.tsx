"use client";
import React from "react";
import AnimatedHeading from "../AnimatedHeading";

export default function WebDesignSplitSection() {
  return (
    <section className="bg-[#121312] min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Left Video */}
        <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-lg bg-[#2b2b2b]">
          <div className="bg-[#2b2b2b] rounded-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[320px] md:max-h-[450px] rounded-md object-cover"
            >
              <source
                src="/assets/herovideos/670bf3be6040f597f238f1be_67606f28c527493b12dfd4ee_nue-arch-jitter-video-socials-transcode.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Content with Two Headings */}
        <div className="md:w-1/2">
          <AnimatedHeading
            text="SEO"
            className="text-3xl md:text-6xl font-extrabold leading-relaxed mb-4"
          />
          <p className="text-gray-300 mb-8 leading-relaxed">
            We don’t just build websites — we build digital experiences that
            align with your brand goals. Every element is designed with a
            strategic focus to drive results and improve user engagement.
          </p>

          <AnimatedHeading
            text="CMS"
            className="text-3xl md:text-6xl font-extrabold leading-relaxed mb-4"
          />
          <p className="text-gray-300 mb-8 leading-relaxed">
            Your site is your strongest marketing tool. We create high-converting
            designs with seamless UX, ensuring your visitors turn into loyal
            customers through clarity, usability, and speed.
          </p>
        </div>
      </div>
    </section>
  );
}
