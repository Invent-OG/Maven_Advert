'use client';

import React from 'react';
import AnimatedButton from '../ui/AnimatedButton';
import { useRouter } from 'next/navigation';
import WhiteButton from '../ui/WhiteButton';

function Gallery() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        View Our Project Gallery
      </h2>
      <p className="text-neutral-500 max-w-xl mb-8">
        Our happy clients, success stories, and gallery of specialised work.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:justify-center items-center">
        <AnimatedButton
          onClick={() => router.push('/gallery')} className='shadow-none'       >
          View Gallery
        </AnimatedButton>

        <WhiteButton onClick={() => router.push('/contact')}>
          Work With Us
        </WhiteButton>
      </div>
    </section>
  );
}

export default Gallery;
