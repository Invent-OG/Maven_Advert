'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroPortfolio = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    const title = titleRef.current;

    if (!image || !container || !title) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Zoom in the image
    tl.fromTo(
      image,
      { scale: 1 },
      { scale: 4, ease: 'none' },
      0
    );

    // Fade in the title after some scroll (e.g., 20% into scroll)
    tl.fromTo(
      title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.2 // This is relative to scroll progress (20%)
    );
  }, []);

  return (
    <section className="relative w-full h-[200vh]" ref={containerRef}>
      {/* Sticky Image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={imageRef}
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/gallery/1.avif')",
          }}
        />

        {/* Centered Title (initially hidden) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h1
            ref={titleRef}
            className="text-white text-4xl md:text-6xl font-bold text-center backdrop-blur-sm bg-black/40 px-6 py-4 rounded-lg opacity-0"
          >
            My Creative Portfolio
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroPortfolio;
