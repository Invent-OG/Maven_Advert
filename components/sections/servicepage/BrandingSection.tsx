"use client";
import Image from "next/image";
import React from "react";

export default function BrandingSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left side */}
        <div>
          <p className="text-sm text-black mb-2">✨ Elevate your brand aesthetics</p>
          <h2 className="text-4xl text-neutral-400 md:text-5xl font-extrabold leading-tight mb-6">
            Branding That <br /> Resonates With Your <br /> Audience
          </h2>

          <div className="mt-8 h-[800px] relative">
            <Image
              src="/assets/services/6761a73d1744ec34556609b4_2-iPhones-Rock reduced.avif"
              alt="Phones with branding"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <Image
              src="/assets/services/676356a2564762bb55ac4056_mode-long-logo-iphone.avif"
              alt="Cardboard design"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>

          <p className="text-gray-300 py-8">
            Great branding is unforgettable, and we make sure your brand’s essence is visible across all touchpoints. We craft trends that connect, stand out, and form a lasting impression. Whether you're a leading influencer or building a new venture, we’re branding services ready to match your bold with beauty.
          </p>

          <button className="px-6 py-2  border border-neutral-400 rounded-full w-max hover:bg-white hover:text-black transition">
            View Gallery
          </button>
        </div>

      </div>
    </section>
  );
}
