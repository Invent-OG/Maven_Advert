'use client';

import React from 'react';
import Link from 'next/link';

function Gallery() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        View Our Project Gallery
      </h2>
      <p className="text-neutral-500 max-w-xl mb-8">
        Our happy clients, success stories, and gallery of specialised work.
      </p>

      <div className="flex sm:flex-row gap-4 sm:justify-start justify-evenly">
  <Link
    href="/gallery"
    className="px-6 py-3 border border-black rounded-full text-black text-sm font-medium transition hover:bg-black hover:text-white text-center"
  >
    View Gallery
  </Link>
  <Link
    href="/contact"
    className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
  >
    Work With Us
  </Link>
</div>

    </section>
  );
}

export default Gallery;
