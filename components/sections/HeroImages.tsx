// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// const heroImages = [
//   {
//     src: '/assets/heroimages/architecture and built environment.webp',
//     alt: 'Architecture',
//     title: 'Architecture',
//     tags: ['UX / UI', 'SEO'],
//   },
//   {
//     src: '/assets/heroimages/creative arts and design.webp',
//     alt: 'Creative Arts',
//     title: 'Creative Arts',
//     tags: ['UX / UI', 'SEO'],
//   },
//   {
//     src: '/assets/heroimages/health and medical science.webp',
//     alt: 'Health & Medical',
//     title: 'Health & Medical',
//     tags: ['UX / UI', 'SEO'],
//   },
//   {
//     src: '/assets/heroimages/law_compressed.webp',
//     alt: 'Law',
//     title: 'Law',
//     tags: ['UX / UI', 'SEO'],
//   },
//   {
//     src: '/assets/heroimages/library & information science.webp',
//     alt: 'Library Science',
//     title: 'Library Science',
//     tags: ['UX / UI', 'SEO'],
//   },
//   {
//     src: '/assets/heroimages/philosophy, politics & economics.webp',
//     alt: 'Philosophy',
//     title: 'Philosophy',
//     tags: ['UX / UI', 'SEO'],
//   },
// ];

// export default function HeroImages() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize();

//     window.addEventListener('resize', handleResize);

//     if (window.innerWidth < 768) return; // Skip GSAP on mobile

//     const ctx = gsap.context(() => {
//       const totalWidth = (sliderRef.current?.scrollWidth || 0) - window.innerWidth;

//       gsap.to(sliderRef.current, {
//         x: () => `-${totalWidth}`,
//         ease: 'none',
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top top',
//           end: () => `+=${totalWidth}`,
//           scrub: true,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     }, containerRef);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       gsap.killTweensOf(sliderRef.current);
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="bg-neutral-900 text-white">
//       {/* Header Section */}
//       <div className="px-6 md:px-20 pt-20">
//         <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//           We're Known For
//         </h1>
//         <p className="text-sm md:text-lg text-neutral-400 max-w-3xl">
//           Building high-performance websites that are specifically designed to showcase your unique style of
//           work and boost client leads.
//         </p>
//       </div>

//       {/* Desktop/Tablet Horizontal Scroll */}
//       {!isMobile && (
//         <section
//           ref={containerRef}
//           className="relative w-full min-h-screen overflow-hidden mt-20 flex items-center"
//         >
//           <div ref={sliderRef} className="flex gap-6 md:gap-10 px-6 md:px-20">
//             {heroImages.map((img, index) => (
//               <div
//                 key={index}
//                 className="panel relative h-[300px] w-[280px] md:h-[500px] md:w-[500px] flex-shrink-0 rounded-xl overflow-hidden bg-neutral-700 shadow-lg group"
//               >
//                 <Image
//                   src={img.src}
//                   alt={img.alt}
//                   fill
//                   className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
//                 />
//                 {/* Bottom-left Tags */}
//                 <div className="absolute bottom-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   {img.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="text-xs md:text-sm bg-white/10 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             {/* Spacer */}
//             <div className="flex-shrink-0" style={{ width: '60vw' }} />
//           </div>
//         </section>
//       )}

//       {/* Mobile Vertical One-by-One Layout */}
//       {isMobile && (
//         <section className="px-6 mt-12 space-y-8">
//           {heroImages.map((img, index) => (
//             <div
//               key={index}
//               className="relative h-[400px] w-full rounded-xl overflow-hidden bg-neutral-700 shadow-md"
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 fill
//                 className="object-cover transition-transform duration-500 ease-in-out"
//               />
//               <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
//                 {/* <h2 className="text-lg font-semibold mb-2">{img.title}</h2> */}
//                 <div className="flex gap-2 flex-wrap">
//                   {img.tags.map((tag, i) => (
//                     <span
//                       key={i}
//                       className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* How Section */}
//       {/* <section className="bg-neutral-900 flex flex-col justify-end items-end text-white h-[30vh] px-6 md:px-20 py-32">
//         <h1 className="text-4xl md:text-8xl font-bold mb-4">How?</h1>
//         <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
//           This is how we do it.
//         </p>
//       </section> */}
//     </div>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
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
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  const ctx = gsap.context(() => {
    // ✅ Only run this part on desktop/tablet
    if (window.innerWidth >= 768) {
      const totalWidth = (sliderRef.current?.scrollWidth || 0) - window.innerWidth;

      // Horizontal scroll animation
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
    }

    // ✅ Always run this — even on mobile
    const startOffset = 15;
    const endOffset = 5;

    letterRefs.current.forEach((el, i) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { color: '#A3A3A3' },
        {
          color: '#ffffff',
          scrollTrigger: {
            trigger: el,
            start: `top+=${i * startOffset}px center`,
            end: `top+=${i * startOffset + endOffset}px center`,
            scrub: true,
          },
        }
      );
    });
  }, containerRef);

  return () => {
    window.removeEventListener('resize', handleResize);
    gsap.killTweensOf(sliderRef.current);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ctx.revert();
  };
}, []);


  const headingText = "We're Known For";

  return (
    <div className="bg-[#171817]">
      {/* Header Section */}
      <div className="px-6 md:px-20 pt-20">
        <h1
          ref={headingRef}
          className="text-4xl  md:text-8xl font-bold leading-tight mb-6  "
        >
          {headingText.split('').map((char, i) => (
            <span
  key={i}
  ref={(el) => {
    if (el) letterRefs.current[i] = el;
  }}
  className="inline-block text-neutral-400" // Tailwind for #A3A3A3
>
  {char === ' ' ? '\u00A0' : char}
</span>

          ))}
        </h1>
        <p className="text-sm md:text-lg text-neutral-400 max-w-3xl">
          Building high-performance websites that are specifically designed to showcase your unique style of
          work and boost client leads.
        </p>
      </div>

      {/* Desktop/Tablet Horizontal Scroll */}
      {!isMobile && (
        <section
          ref={containerRef}
          className="relative w-full min-h-screen overflow-hidden mt-20 flex items-center"
        >
          <div ref={sliderRef} className="flex gap-6 md:gap-10 px-6 md:px-20">
            {heroImages.map((img, index) => (
              <div
                key={index}
                className="panel relative h-[300px] w-[280px] md:h-[500px] md:w-[500px] flex-shrink-0 rounded-xl overflow-hidden bg-[#171817] shadow-lg group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Bottom-left Tags */}
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
            <div className="flex-shrink-0" style={{ width: '60vw' }} />
          </div>
        </section>
      )}

      {/* Mobile Vertical One-by-One Layout */}
      {isMobile && (
        <section className="px-6 mt-12 space-y-8">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="relative h-[400px] w-full rounded-xl overflow-hidden bg-[#171817] shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                <div className="flex gap-2 flex-wrap">
                  {img.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/10 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

