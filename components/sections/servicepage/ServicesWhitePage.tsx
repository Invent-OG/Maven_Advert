// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import BrandingSection from './BrandingSection';

// gsap.registerPlugin(ScrollTrigger);

// export default function ServicesWhitePage() {
//   const whiteSectionRef = useRef<HTMLElement | null>(null);
//   const titleRef = useRef<HTMLDivElement | null>(null);
//   const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     const ctx = gsap.context(() => {
//       ScrollTrigger.refresh();

//       // Background + Text color transition
//       gsap.to(document.body, {
//         scrollTrigger: {
//           trigger: whiteSectionRef.current,
//           start: 'top 90%',
//           end: 'center center',
//           scrub: true,
//           onUpdate: (self) => {
//             const progress = self.progress;
//             gsap.to(document.body, {
//               backgroundColor: progress > 0.2 ? '#ffffff' : '#000000',
//               color: progress > 0.3 ? '#000000' : '#ffffff',
//               overwrite: 'auto',
//               duration: 0,
//               ease: 'power1.out',
//             });
//           },
//         },
//       });

//       // Letter-by-letter animation
//       const MOBILE_SCROLL_OFFSET = 14;
//       const DESKTOP_SCROLL_STEP = 8;

//       letterRefs.current.forEach((el, i) => {
//         if (!el) return;

//         const startTrigger = isMobile
//           ? `top+=${i * MOBILE_SCROLL_OFFSET}px center`
//           : `top+=${i * DESKTOP_SCROLL_STEP}px center`;

//         gsap.fromTo(
//           el,
//           { color: '#9CA3AF' },
//           {
//             color: '#000000',
//             scrollTrigger: {
//               trigger: el,
//               start: startTrigger,
//               end: 'top center',
//               scrub: true,
//             },
//           }
//         );
//       });
//     }, whiteSectionRef);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       ctx.revert();
//     };
//   }, [isMobile]);

// //   const text = 'Our Results-Driven\nPhilosophy';
// const text = 'Those Who Seek Results \n Choose Us.'

//   return (
//     <section
//       ref={whiteSectionRef}
//       className="md:min-h-screen  min-h-[60vh] flex flex-col items-center px-4 md:py-24 py-20"
//     >
//       {/* Animated Heading */}
//       <div
//         ref={titleRef}
//         className="text-center text-5xl sm:text-6xl md:text-[6rem]  font-extrabold leading-snug mb-12"
//       >
//         {[...text].map((char, i) => {
//           if (char === '\n') return <br key={`br-${i}`} />;
//           if (char === ' ') {
//             return (
//               <span key={`space-${i}`} className="inline-block  w-[0.4em]">
//                 {' '}
//               </span>
//             );
//           }
//           return (
//             <span
//               key={i}
//               ref={(el) => {
//                 letterRefs.current[i] = el;
//               }}
//               className="inline-block "
//               style={{ color: '#9CA3AF' }}
//             >
//               {char}
//             </span>
//           );
//         })}
//       </div>
//       <BrandingSection/>
//     </section>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandingSection from './BrandingSection';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesWhitePage() {
  const whiteSectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [formattedText, setFormattedText] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // 3 lines for mobile
      setFormattedText('Those Who Seek \n Results,Choose \n Us.');
    } else {
      // 2 lines for desktop
      setFormattedText('Those Who Seek Results,\nChoose Us.');
    }
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      // Background + Text color transition
      gsap.to(document.body, {
        scrollTrigger: {
          trigger: whiteSectionRef.current,
          start: 'top 90%',
          end: 'center center',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(document.body, {
              backgroundColor: progress > 0.2 ? '#ffffff' : '#171817',
              color: progress > 0.3 ? '#171817' : '#ffffff',
              overwrite: 'auto',
              duration: 0,
              ease: 'power1.out',
            });
          },
        },
      });

      // Letter-by-letter animation
      const MOBILE_SCROLL_OFFSET = 8;
      const DESKTOP_SCROLL_STEP = 8;

      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        const startTrigger = isMobile
          ? `top+=${i * MOBILE_SCROLL_OFFSET}px center`
          : `top+=${i * DESKTOP_SCROLL_STEP}px center`;

        gsap.fromTo(
          el,
          { color: '#9CA3AF' },
          {
            color: '#000000',
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              end: 'top center',
              scrub: true,
            },
          }
        );
      });
    }, whiteSectionRef);

    return () => {
      ctx.revert();
    };
  }, [formattedText, isMobile]);

  return (
    <section
      ref={whiteSectionRef}
      className="md:min-h-screen min-h-[60vh] flex flex-col items-center px-4 md:py-24 py-20"
    >
      {/* Animated Heading */}
      <div
        ref={titleRef}
        className="text-center text-4xl sm:text-6xl md:text-[6rem] font-bold leading-snug mb-12"
      >
        {[...formattedText].map((char, i) => {
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
                letterRefs.current[i] = el;
              }}
              className="inline-block"
              style={{ color: '#9CA3AF' }}
            >
              {char}
            </span>
          );
        })}
      </div>

      <BrandingSection />
    </section>
  );
}
