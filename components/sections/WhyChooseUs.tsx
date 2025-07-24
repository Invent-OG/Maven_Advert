'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          backgroundColor: '#000000',
          color: '#ffffff',
          duration: 5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 10%',
            end: 'center center',
            toggleActions: 'play reverse play reverse',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Specialists In The Building Industry',
      desc: 'We know your industry inside-out and understand what potential clients are looking for. Showcase your expertise and build trust instantly.',
      icon: '✨',
    },
    {
      title: 'Data-Driven Design',
      desc: "Every website is custom-built and optimised with usability data and UX design principals to turn visitors into clients. While aligning to your brand's aesthetic language.",
      icon: '⚡',
    },
    {
      title: 'Captivating Digital Solutions',
      desc: 'We create digital experiences that your visitors will remember. Our websites are designed to impress and engage potential clients within seconds.',
      icon: '🎨',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen text-black transition-colors duration-100 ease-in-out px-6 md:px-20 py-24"
    >
        <p className='py-4'>✦ Tell your story through web design.</p>
      <h2 className="text-4xl md:text-6xl font-extrabold text-start mb-20 flex items-start justify-start gap-4">
        Why Clients Choose Us

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] text-white p-8 rounded-lg border border-neutral-700 hover:border-lime-300 hover:shadow-[0_0_15px_2px_rgba(191,255,0,0.3)] transition duration-300 ease-in-out"
          >
            <div className="text-5xl mb-6">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
