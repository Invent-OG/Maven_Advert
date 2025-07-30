'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroGallery() {
  return (
    <section className="bg-[#171817] text-white py-8">
      {/* Top Content Section */}
      <div className="min-h-[80vh] flex flex-col gap-4 items-start justify-center px-6 md:px-20">
        <p>✦ Explore some of our client work below.</p>
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
          Our Results- <br />
          Driven Project <br />
          Showcase
        </h1>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center items-center overflow-hidden bg-[#171817]">
        <div className="w-full max-w-7xl h-full">
          <Image
            src="/assets/gallery/6761a73d1744ec34556609b4_2-iPhones-Rock reduced.avif"
            alt="Project Showcase Image"
            width={1920}
            height={1080}
            className="w-full p-4 h-[30vh] md:h-[100vh] object-cover rounded-t-lg"
            priority
          />
        </div>
      </div>

      {/* Button aligned to right */}
      <div className="flex justify-end px-6 md:px-20 mt-6">
        <button className="text-white border border-white px-6 py-2 rounded-3xl">
          Work with us
        </button>
      </div>
    </section>
  );
}
