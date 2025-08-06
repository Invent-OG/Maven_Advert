// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function CTASection() {
//   const sectionRef = useRef(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLHeadingElement | null>(null);
//   const letterRefs = useRef<HTMLSpanElement[]>([]);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.refresh(); // ensures proper layout on mobile resize

//       // Pin the section
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: 'top top',
//         end: '+=100%',
//         pin: true,
//         pinSpacing: true,
//         scrub: true,
//       });

//       // Per-letter scroll animation (same logic as FinalSection)
//       const isMobile = window.innerWidth <= 768;
//       letterRefs.current.forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { color: '#D1D5DB' }, // Tailwind gray-300
//           {
//             color: '#000000',
//             scrollTrigger: {
//               trigger: el,
//               start: isMobile ? 'top 90%' : `top+=${i * 10}px center`,
//               end: 'top 50%',
//               scrub: true,
//             },
//           }
//         );
//       });

//       // Button fade-up animation
//       gsap.fromTo(
//         buttonRef.current,
//         { opacity: 0, y: 80 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.5,
//           delay: 0.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 60%',
//           },
//         }
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const text = 'Start The Conversation';

//   return (
//     <section
//       ref={sectionRef}
//       className="relative z-200 h-screen flex flex-col items-center justify-center bg-white text-center px-4"
//     >
//       <h2
//         ref={textRef}
//         className="text-5xl md:text-7xl font-bold text-gray-300"
//       >
//         {text.split('').map((char, i) => (
//           <span
//             key={i}
//             ref={(el) => {
//               if (el) letterRefs.current[i] = el;
//             }}
//             className="inline-block"
//             style={{ color: '#D1D5DB' }}
//           >
//             {char === ' ' ? '\u00A0' : char}
//           </span>
//         ))}
//       </h2>
//       <button
//         ref={buttonRef}
//         className="px-6 mt-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
//       >
//         Book A Call
//       </button>
//     </section>
//   );
// }
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhiteButton from '../ui/WhiteButton';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const buttonRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=80%',
        pin: true,
        pinSpacing: true,
        scrub: true,
      });

      const startOffset = 15; // Control how soon animation starts
      const endOffset = 5; // Control how long each letter stays in animation

      letterRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { color: '#D1D5DB' },
          {
            color: '#000000',
            scrollTrigger: {
              trigger: el,
              start: `top+=${i * startOffset}px center`,
              end: `top+=${i * startOffset + endOffset}px center`,
              scrub: true,
            },
          }
        );
      });

      // Uncomment below if you want the button animation
      // gsap.fromTo(
      //   buttonRef.current,
      //   { opacity: 0, y: 80 },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 0.5,
      //     delay: 0.2,
      //     ease: 'power3.out',
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: 'top 60%',
      //     },
      //   }
      // );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = 'Start The Conversation';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-white text-center px-4"
    >
      <h2
        ref={textRef}
        className="text-5xl md:text-7xl font-bold text-gray-300"
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) letterRefs.current[i] = el;
            }}
            className="inline-block"
            style={{ color: '#D1D5DB' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
        <WhiteButton className='mt-6' onClick={() => router.push('/contact')}>
                Book A Call
              </WhiteButton>
    </section>
  );
}

