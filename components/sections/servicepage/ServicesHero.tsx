'use client';

import React from 'react';
import { IoIosStar } from 'react-icons/io';

export default function ServicesHero() {
  return (
    <section className="min-h-[50vh] md:py-32 bg-[#121312] flex flex-col justify-center px-8 md:px-24 text-white font-sans">
      <div className="max-w-6xl w-full mx-auto">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          {/* Mobile: 2 lines */}
          <span className="block sm:hidden">
            Unlock Your <br />
            Potential With Us
          </span>

          {/* Tablet/Desktop: 3 lines */}
          <span className="hidden sm:block">
            Unlock Your <br />
            Potential With <br />
            Us
          </span>
        </h1>

        {/* Subtext */}
        <div className="flex items-center gap-2 mt-8 sm:mt-6 text-gray-400 text-xs sm:text-sm md:text-base">
          <IoIosStar className="text-xs" />
          <span>Our Services</span>
        </div>

        {/* Button */}
        <div className="mt-10 sm:mt-8">
          <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121312] border border-white text-white text-sm font-medium relative hover:scale-105 transition-transform duration-300 shadow-[0_0_25px_0_rgba(194,255,104,0.3)]">
            Work With Us
            <span className="absolute inset-0 rounded-full ring-[0.5px] ring-lime-300 blur-[6px] opacity-30 pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
