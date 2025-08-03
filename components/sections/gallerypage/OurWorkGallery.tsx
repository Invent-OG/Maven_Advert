'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const OurWorkGallery = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    const textWidth = marqueeElement.scrollWidth;
    const containerWidth = marqueeElement.clientWidth;

    // GSAP infinite scroll animation
    gsap.to(marqueeElement, {
      x: `-${textWidth / 2}`,
      duration: 60,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full bg-[#DDF694] overflow-hidden py-6">
      <div className="relative w-full">
        <div
          className="flex whitespace-nowrap text-black font-extrabold text-4xl lg:text-8xl uppercase tracking-widest gap-20"
          ref={marqueeRef}
        >
          {Array(20)
            .fill("OUR WORK")
            .map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OurWorkGallery;
