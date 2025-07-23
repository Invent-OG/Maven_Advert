'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClientCardsSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const whiteSectionRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // Pin the left side and apply blur
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${cards.length * window.innerHeight}`,
        pin: leftRef.current,
        scrub: true,
        onUpdate: (self) => {
          if (leftRef.current) {
            leftRef.current.style.filter = self.progress > 0.05 ? 'blur(4px)' : 'none';
          }
        },
      });

      // Animate cards one by one
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              onEnter: () => {
                cards.forEach((c, i) => {
                  if (i !== index) {
                    gsap.to(c, { opacity: 0, scale: 0.9, duration: 0.3 });
                  }
                });
                gsap.to(card, { opacity: 1, scale: 1, duration: 0.5 });
              },
            },
          }
        );
      });

      // Animate wrapper background color to white
      if (wrapperRef.current && whiteSectionRef.current) {
        gsap.to(wrapperRef.current, {
          backgroundColor: '#ffffff',
          color: '#000000',
          scrollTrigger: {
            trigger: whiteSectionRef.current,
            start: 'top center',
            end: 'top top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="bg-black text-white transition-colors duration-1000">
      {/* Main Scroll Section */}
      <section
        ref={sectionRef}
        className="relative flex md:flex-row flex-col min-h-[500vh] px-6 md:px-20"
      >
        {/* Sticky Left Side */}
        <div
          ref={leftRef}
          className="md:w-1/2 w-full h-screen sticky top-0 flex items-center justify-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-md">
              These are some of the amazing clients we’ve worked with over time.
            </p>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="md:w-1/2 w-full flex flex-col justify-start relative">
          {['Apple', 'Google', 'Netflix', 'Amazon'].map((client, index) => (
            <div
              key={client}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="h-screen flex items-center justify-center"
            >
              <div className="bg-white text-black p-10 rounded-3xl shadow-2xl text-center max-w-md w-full mx-auto">
                <h2 className="text-3xl font-semibold mb-3">{client}</h2>
                <p className="text-gray-600">
                  We collaborated with {client} on multiple successful projects.
                </p>
              </div>
            </div>
          ))}
          {/* Spacer to keep last card centered */}
          <div className="h-screen"></div>
        </div>
      </section>

      {/* White Section with Centered Text */}
      <section
        ref={whiteSectionRef}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center text-7xl font-bold leading-snug">
          Attract High-End Clients,<br />
          and More of Them.
        </div>
      </section>
    </div>
  );
}
