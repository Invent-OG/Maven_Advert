'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const whiteSectionRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Force ScrollTrigger to refresh on resize (important for mobile)
      ScrollTrigger.refresh();

      // White background + black text on scroll
      if (wrapperRef.current && whiteSectionRef.current) {
        gsap.to(wrapperRef.current, {
          backgroundColor: '#ffffff',
          color: '#000000',
          scrollTrigger: {
            trigger: whiteSectionRef.current,
            start: 'top 98%', // adjusted for mobile
            end: 'top top',
            scrub: true,
          },
        });
      }

      // Per-letter scroll animation
      if (titleRef.current && letterRefs.current.length > 0) {
        const isMobile = window.innerWidth <= 768;

        letterRefs.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            { color: '#9CA3AF' },
            {
              color: '#000000',
              scrollTrigger: {
                trigger: el,
                start: isMobile
                  ? 'top 90%' // fire early on mobile
                  : `top+=${i * 10}px center`,
                end: 'top 50%',
                scrub: true,
              },
            }
          );
        });
      }
    }, whiteSectionRef);

    return () => ctx.revert();
  }, []);

  const text = 'Attract High-End Clients,and \nMore of Them.';

  return (
    <div ref={wrapperRef}>
      <section
        ref={whiteSectionRef}
        className="min-h-screen  flex items-center justify-center px-4"
      >
        <div
          ref={titleRef}
          className="text-center text-4xl sm:text-6xl md:text-[5.5rem] font-bold leading-snug"
        >
          {[...text].map((char, i) => {
            if (char === '\n') return <br key={`br-${i}`} />;
            if (char === ' ') {
              return (
                <span key={`space-${i}`} className="inline-block w-[0.4em]">
                  {' '}
                </span>
              );
            }
            return (
              <span
                key={i}
                ref={(el) => {
                  if (el) letterRefs.current[i] = el;
                }}
                className="inline-block"
                style={{ color: '#9CA3AF' }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}
