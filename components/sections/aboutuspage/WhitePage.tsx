// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function WhitePage() {
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

//      ScrollTrigger.create({
//   trigger: whiteSectionRef.current,
//   start: 'top bottom',
//   end: 'bottom center',
//   onEnter: () => {
//     gsap.to(document.body, {
//       backgroundColor: '#ffffff',
//       color: '#000000',
//       duration: 0.2,
//       ease: 'power2.inOut',
//     });
//   },
//   onLeaveBack: () => {
//     gsap.to(document.body, {
//       backgroundColor: '#000000',
//       color: '#ffffff',
//       duration: 0.1,
//       ease: 'power2.inOut',
//     });
//   },
// });
//       // ✅ Letter-by-letter animation (unchanged)
//       const MOBILE_SCROLL_OFFSET = 4;
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

//   const text = 'Our Results-Driven\nPhilosophy';

//   return (
//     <section
//       ref={whiteSectionRef}
//       className="md:min-h-[140vh] min-h-[70vh] flex flex-col items-center px-4 md:py-20 py-24"
//     >
//       {/* Animated Heading */}
//       <div
//         ref={titleRef}
//         className="text-center text-4xl sm:text-6xl md:text-[5.5rem] font-extrabold leading-snug mb-12"
//       >
//         {[...text].map((char, i) => {
//           if (char === '\n') return <br key={`br-${i}`} />;
//           if (char === ' ') {
//             return (
//               <span key={`space-${i}`} className="inline-block w-[0.4em]">
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
//               className="inline-block"
//               style={{ color: '#9CA3AF' }}
//             >
//               {char}
//             </span>
//           );
//         })}
//       </div>

//       {/* Left-aligned paragraph */}
//       <div className="w-full max-w-3xl px-4 md:px-0 self-start md:mt-32 md:pl-16">
//         <p className="text-sm md:text-base font-medium text-black mb-2">
//           ✦ Showcase your story through design
//         </p>
//         <p className="text-3xl md:text-6xl font-extrabold text-gray-300 leading-tight">
//           If you appreciate the beauty in simplicity and value quality...
//         </p>
//       </div>
//     </section>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutCTA from './AboutCTA';

gsap.registerPlugin(ScrollTrigger);

export default function WhitePage() {
  const whiteSectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

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
              backgroundColor: progress > 0.4 ? '#ffffff' : '#000000',
              color: progress > 0.3 ? '#000000' : '#ffffff',
              overwrite: 'auto',
              duration: 0,
              ease: 'power1.out',
            });
          },
        },
      });

      // Letter-by-letter animation
      const MOBILE_SCROLL_OFFSET = 4;
      const DESKTOP_SCROLL_STEP = 12;

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
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isMobile]);

  const text = 'Our Results-Driven\nPhilosophy';

  return (
    <section
      ref={whiteSectionRef}
      className="md:min-h-[140vh] sticky top-0  min-h-[60vh] flex flex-col items-center px-4 md:py-20 py-24"
    >
      {/* Animated Heading */}
      <div
        ref={titleRef}
        className="text-center text-4xl sm:text-6xl md:text-[5.5rem] font-extrabold leading-snug mb-12"
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

      {/* Left-aligned paragraph */}
      <div className="w-full max-w-3xl px-4 md:px-0 self-start  md:mt-32 md:pl-16 py-10">
        <p className="text-sm md:text-base font-medium text-black mb-4 ">
          ✦ Showcase your story through design
        </p>
        <p className="text-3xl md:text-6xl font-extrabold text-gray-300 leading-tight">
          If you appreciate the beauty in simplicity and value quality...
        </p>
      </div>
    </section>
  );
}
