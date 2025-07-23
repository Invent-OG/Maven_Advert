'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  {
    src: '/assets/heroimages/architecture and built environment.webp',
    alt: 'Architecture',
    title: 'Architecture',
    tags: ['UX / UI', 'SEO'],
  },
  {
    src: '/assets/heroimages/creative arts and design.webp',
    alt: 'Creative Arts',
    title: 'Creative Arts',
    tags: ['UX / UI', 'SEO'],
  },
  {
    src: '/assets/heroimages/health and medical science.webp',
    alt: 'Health & Medical',
    title: 'Health & Medical',
    tags: ['UX / UI', 'SEO'],
  },
  {
    src: '/assets/heroimages/law_compressed.webp',
    alt: 'Law',
    title: 'Law',
    tags: ['UX / UI', 'SEO'],
  },
  {
    src: '/assets/heroimages/library & information science.webp',
    alt: 'Library Science',
    title: 'Library Science',
    tags: ['UX / UI', 'SEO'],
  },
  {
    src: '/assets/heroimages/philosophy, politics & economics.webp',
    alt: 'Philosophy',
    title: 'Philosophy',
    tags: ['UX / UI', 'SEO'],
  },
];

export default function HeroImages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = (sliderRef.current?.scrollWidth || 0) - window.innerWidth;

      gsap.to(sliderRef.current, {
        x: () => `-${totalWidth}`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-neutral-900 text-white">
      {/* Header Section */}
      <div className="px-6 md:px-20 pt-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          We're Known For
        </h1>
        <p className="text-sm md:text-lg text-neutral-400 max-w-3xl">
          Building high-performance websites that are specifically designed to showcase your unique style of
          work and boost client leads.
        </p>
      </div>

      {/* Horizontal Scroll Section */}
      <section
        ref={containerRef}
        className="relative w-full min-h-screen overflow-hidden mt-20 flex items-center"
      >
        <div ref={sliderRef} className="flex gap-6 md:gap-10 px-6 md:px-20">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="panel relative h-[300px] w-[280px] md:h-[500px] md:w-[500px] flex-shrink-0 rounded-xl overflow-hidden bg-neutral-700 shadow-lg group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Bottom-left Tags on Hover */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm bg-white/10 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Spacer to finish scroll */}
          <div className="flex-shrink-0" style={{ width: '60vw' }} />
        </div>
      </section>

      {/* How Section */}
      <section className="bg-neutral-900 flex flex-col justify-end items-end text-white h-[30vh] px-6 md:px-20 py-32">
  <h1 className="text-4xl md:text-8xl font-bold mb-4">How?</h1>
  <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
    This is how we do it.
  </p>
</section>
    </div>
  );
}
