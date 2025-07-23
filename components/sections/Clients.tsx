
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import {
//   FaPenNib,
//   FaChartLine,
//   FaShieldAlt,
//   FaCompass,
//   FaLightbulb,
//   FaPalette,
// } from 'react-icons/fa';

// gsap.registerPlugin(ScrollTrigger);

// export default function ClientCardsSection() {
//   const sectionRef = useRef(null);
//   const leftRef = useRef<HTMLDivElement | null>(null);
//   const cardsRef = useRef<HTMLDivElement[]>([]);
//   const iconTopRefs = useRef<HTMLDivElement[]>([]);
//   const iconBottomRefs = useRef<HTMLDivElement[]>([]);
//   const whiteSectionRef = useRef(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const mobileLeftRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const cardData = [
//     {
//       title: 'Captivating Your Visitors',
//       description:
//         'Through jaw-dropping design, our websites instantly capture attention and prove your expertise.',
//       topIcon: <FaPenNib className="text-lime-400 w-8 h-8" />,
//     },
//     {
//       title: 'Boosting Conversion Rates',
//       description:
//         'We build high-converting landing pages that turn visitors into loyal customers.',
//       topIcon: <FaChartLine className="text-lime-400 w-8 h-8" />,
//     },
//     {
//       title: 'Establishing Trust Instantly',
//       description:
//         'Clear messaging and elegant design builds trust with high-end clients from the first glance.',
//       topIcon: <FaShieldAlt className="text-lime-400 w-8 h-8" />,
//     },
//     {
//       title: 'Streamlining the Journey',
//       description:
//         'Intuitive navigation and layout help users find what they need, fast — leading to better outcomes.',
//       topIcon: <FaCompass className="text-lime-400 w-8 h-8" />,
//     },
//     {
//       title: 'Highlighting Your Value',
//       description:
//         'We position your brand as the premium choice through compelling copy and visuals.',
//       topIcon: <FaLightbulb className="text-lime-400 w-8 h-8" />,
//     },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     const ctx = gsap.context(() => {
//       const cards = cardsRef.current;

//       const animateText = (container: HTMLElement | null) => {
//         if (!container) return;
//         const spans = container.querySelectorAll('span');
//         gsap.fromTo(
//           spans,
//           { color: '#4B5563' },
//           {
//             color: '#ffffff',
//             stagger: 0.05,
//             ease: 'power2.out',
//             scrollTrigger: {
//               trigger: container,
//               start: 'top center',
//               end: '+=300',
//               scrub: true,
//             },
//           }
//         );
//       };

//       if (!isMobile) {
//         animateText(leftRef.current);
//         ScrollTrigger.create({
//           trigger: sectionRef.current,
//           start: 'top+=300 center',
//           end: () => `+=${cards.length * window.innerHeight}`,
//           pin: leftRef.current,
//           scrub: true,
//           onUpdate: (self) => {
//             if (leftRef.current) {
//               leftRef.current.style.filter =
//                 self.progress > 0.05 ? 'blur(4px)' : 'none';
//             }
//           },
//         });
//       } else {
//         animateText(mobileLeftRef.current);
//         if (mobileLeftRef.current) {
//           ScrollTrigger.create({
//             trigger: mobileLeftRef.current,
//             start: 'top top',
//             end: '+=200',
//             scrub: true,
//             onUpdate: (self) => {
//               mobileLeftRef.current!.style.filter = `blur(${self.progress * 6}px)`;
//             },
//           });
//         }
//       }

//       cards.forEach((card, index) => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%',
//             end: 'center center',
//             scrub: true,
//           },
//         });

//         tl.fromTo(
//           card,
//           { opacity: 0, scale: 0.9, y: 100 },
//           { opacity: 1, scale: 1, y: 0, duration: 0.9 }
//         );

//         if (iconTopRefs.current[index]) {
//           tl.fromTo(
//             iconTopRefs.current[index],
//             { opacity: 0, y: -20, scale: 0.5 },
//             { opacity: 1, y: 0, scale: 1, duration: 0.9 },
//             '+=0.1'
//           );
//         }

//         if (iconBottomRefs.current[index]) {
//           tl.fromTo(
//             iconBottomRefs.current[index],
//             { opacity: 0, y: 20, scale: 0.5 },
//             { opacity: 1, y: 0, scale: 1, duration: 0.9 },
//             '+=0.1'
//           );
//         }
//       });

//       if (wrapperRef.current && whiteSectionRef.current) {
//         gsap.to(wrapperRef.current, {
//           backgroundColor: '#ffffff',
//           color: '#000000',
//           scrollTrigger: {
//             trigger: whiteSectionRef.current,
//             start: 'top bottom',
//             end: 'top top',
//             scrub: true,
//           },
//         });
//       }
//     }, sectionRef);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       ctx.revert();
//     };
//   }, [isMobile]);

//   const wrapText = (text: string) => {
//     return text.split('').map((char, index) => (
//       <span
//         key={index}
//         className="inline-block text-gray-600 transition-colors duration-500"
//       >
//         {char === ' ' ? ' ' : char}
//       </span>
//     ));
//   };

//   return (
//     <div
//       ref={wrapperRef}
//       className="bg-neutral-900 text-white transition-colors duration-1000"
//     >
//       <section
//         ref={sectionRef}
//         className={`relative flex ${
//           isMobile ? 'flex-col' : 'md:flex-row'
//         } justify-center gap-20 px-4 md:px-20 ${
//           isMobile ? 'pb-20' : 'min-h-[600vh]'
//         }`}
//       >
//         {/* Left Side */}
//         {isMobile ? (
//           <div
//             ref={mobileLeftRef}
//             className="w-full sticky top-0 z-0 bg-neutral-900 py-12 text-center"
//           >
//             <p className="text-sm text-neutral-400 mb-2">
//               ★ Attract more clients, high-end clients.
//             </p>
//             <h1 className="text-4xl sm:text-5xl font-bold leading-tight space-y-2">
//               <div>{wrapText('We Help')}</div>
//               <div>{wrapText('Grow Your')}</div>
//               <div>{wrapText('Company By')}</div>
//             </h1>
//           </div>
//         ) : (
//           <div
//             ref={leftRef}
//             className="md:w-1/2 w-full h-screen sticky top-0 flex items-center justify-center"
//           >
//             <div className="text-left px-4">
//               <p className="text-sm text-neutral-400 mb-4">
//                 ★ Attract more clients, high-end clients.
//               </p>
//               <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight space-y-2">
//                 <div>{wrapText('We Help')}</div>
//                 <div>{wrapText('Grow Your')}</div>
//                 <div>{wrapText('Company By')}</div>
//               </h1>
//             </div>
//           </div>
//         )}

//         {/* Right Side Cards */}
//         <div className="md:w-1/2 w-full flex flex-col relative z-0">
//           {!isMobile && <div className="h-screen" />}
//           {cardData.map((card, index) => (
//             <div
//               key={index}
//               ref={(el) => {
//                 if (el) cardsRef.current[index] = el;
//               }}
//               className="h-screen flex items-center justify-center px-2"
//             >
//               <div className="relative bg-neutral-900 text-white p-6 md:p-10 rounded-xl border border-lime-400 shadow-[0_0_60px_#84cc16] ring-1 ring-lime-200 max-w-xl w-full mx-auto">
//                 {/* Top Icon */}
//                 <div
//                   ref={(el) => {
//                     if (el) iconTopRefs.current[index] = el;
//                   }}
//                   className="absolute -top-5 -left-5 bg-black rounded-full p-2 shadow-lg opacity-0"
//                 >
//                   {card.topIcon}
//                 </div>

//                 <h2 className="text-xl md:text-3xl font-semibold mb-4 break-words">
//                   {card.title}
//                 </h2>
//                 <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
//                   {card.description}
//                 </p>

//                 {/* Bottom Icon */}
//                 <div
//                   ref={(el) => {
//                     if (el) iconBottomRefs.current[index] = el;
//                   }}
//                   className="absolute -bottom-5 -right-5 bg-black rounded-full p-2 shadow-lg opacity-0"
//                 >
//                   <FaPalette className="text-lime-400 w-6 h-6 md:w-8 md:h-8" />
//                 </div>
//               </div>
//             </div>
//           ))}
//           {isMobile && <div className="h-[40vh]" />}
//         </div>
//       </section>

//       {/* Final Section */}
//       <section
//         ref={whiteSectionRef}
//         className="min-h-screen flex items-center justify-center px-4" >
//         <div className="text-center text-4xl sm:text-6xl md:text-8xl font-bold leading-snug">
//           Attract High-End Clients, and
//           <br />
//            More of Them.
//         </div>
//       </section>
//     </div>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  FaPenNib,
  FaChartLine,
  FaShieldAlt,
  FaCompass,
  FaLightbulb,
  FaPalette,
} from 'react-icons/fa';
import FinalSection from './FinalSection';

gsap.registerPlugin(ScrollTrigger);

export default function ClientCardsSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const iconTopRefs = useRef<HTMLDivElement[]>([]);
  const iconBottomRefs = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileLeftRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const cardData = [
    {
      title: 'Captivating Your Visitors',
      description:
        'Through jaw-dropping design, our websites instantly capture attention and prove your expertise.',
      topIcon: <FaPenNib className="text-lime-400 w-8 h-8" />,
    },
    {
      title: 'Boosting Conversion Rates',
      description:
        'We build high-converting landing pages that turn visitors into loyal customers.',
      topIcon: <FaChartLine className="text-lime-400 w-8 h-8" />,
    },
    {
      title: 'Establishing Trust Instantly',
      description:
        'Clear messaging and elegant design builds trust with high-end clients from the first glance.',
      topIcon: <FaShieldAlt className="text-lime-400 w-8 h-8" />,
    },
    {
      title: 'Streamlining the Journey',
      description:
        'Intuitive navigation and layout help users find what they need, fast — leading to better outcomes.',
      topIcon: <FaCompass className="text-lime-400 w-8 h-8" />,
    },
    {
      title: 'Highlighting Your Value',
      description:
        'We position your brand as the premium choice through compelling copy and visuals.',
      topIcon: <FaLightbulb className="text-lime-400 w-8 h-8" />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      const animateText = (container: HTMLElement | null) => {
        if (!container) return;
        const spans = container.querySelectorAll('span');
        gsap.fromTo(
          spans,
          { color: '#4B5563' },
          {
            color: '#ffffff',
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top center',
              end: '+=300',
              scrub: true,
            },
          }
        );
      };

      if (!isMobile) {
        animateText(leftRef.current);
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top+=300 center',
          end: () => `+=${cards.length * window.innerHeight}`,
          pin: leftRef.current,
          scrub: true,
          onUpdate: (self) => {
            if (leftRef.current) {
              leftRef.current.style.filter =
                self.progress > 0.05 ? 'blur(4px)' : 'none';
            }
          },
        });
      } else {
        animateText(mobileLeftRef.current);
        if (mobileLeftRef.current) {
          ScrollTrigger.create({
            trigger: mobileLeftRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
            onUpdate: (self) => {
              mobileLeftRef.current!.style.filter = `blur(${self.progress * 6}px)`;
            },
          });
        }
      }

      cards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'center center',
            scrub: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, scale: 0.9, y: 100 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 }
        );

        if (iconTopRefs.current[index]) {
          tl.fromTo(
            iconTopRefs.current[index],
            { opacity: 0, y: -20, scale: 0.5 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9 },
            '+=0.1'
          );
        }

        if (iconBottomRefs.current[index]) {
          tl.fromTo(
            iconBottomRefs.current[index],
            { opacity: 0, y: 20, scale: 0.5 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9 },
            '+=0.1'
          );
        }
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isMobile]);

  const wrapText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block text-gray-600 transition-colors duration-500"
      >
        {char === ' ' ? ' ' : char}
      </span>
    ));
  };

  return (
    <div ref={wrapperRef} className="bg-neutral-900 text-white transition-colors duration-1000">
      <section
        ref={sectionRef}
        className={`relative flex ${
          isMobile ? 'flex-col' : 'md:flex-row'
        } justify-center gap-20 px-4 md:px-20 ${
          isMobile ? 'pb-20' : 'min-h-[600vh]'
        }`}
      >
        {/* Left Side */}
        {isMobile ? (
          <div
            ref={mobileLeftRef}
            className="w-full sticky top-0 z-0 bg-neutral-900 py-12 text-center"
          >
            <p className="text-sm text-neutral-400 mb-2">
              ★ Attract more clients, high-end clients.
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight space-y-2">
              <div>{wrapText('We Help')}</div>
              <div>{wrapText('Grow Your')}</div>
              <div>{wrapText('Company By')}</div>
            </h1>
          </div>
        ) : (
          <div
            ref={leftRef}
            className="md:w-1/2 w-full h-screen sticky top-0 flex items-center justify-center"
          >
            <div className="text-left px-4">
              <p className="text-sm text-neutral-400 mb-4">
                ★ Attract more clients, high-end clients.
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight space-y-2">
                <div>{wrapText('We Help')}</div>
                <div>{wrapText('Grow Your')}</div>
                <div>{wrapText('Company By')}</div>
              </h1>
            </div>
          </div>
        )}

        {/* Right Side Cards */}
        <div className="md:w-1/2 w-full flex flex-col relative z-0">
          {!isMobile && <div className="h-screen" />}
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="h-screen flex items-center justify-center px-2"
            >
              <div className="relative bg-neutral-900 text-white p-6 md:p-10 rounded-xl border border-lime-400 shadow-[0_0_60px_#84cc16] ring-1 ring-lime-200 max-w-xl w-full mx-auto">
                {/* Top Icon */}
                <div
                  ref={(el) => {
                    if (el) iconTopRefs.current[index] = el;
                  }}
                  className="absolute -top-5 -left-5 bg-black rounded-full p-2 shadow-lg opacity-0"
                >
                  {card.topIcon}
                </div>

                <h2 className="text-xl md:text-3xl font-semibold mb-4 break-words">
                  {card.title}
                </h2>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom Icon */}
                <div
                  ref={(el) => {
                    if (el) iconBottomRefs.current[index] = el;
                  }}
                  className="absolute -bottom-5 -right-5 bg-black rounded-full p-2 shadow-lg opacity-0"
                >
                  <FaPalette className="text-lime-400 w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </div>
          ))}
          {isMobile && <div className="h-[40vh]" />}
        </div>
      </section>

      {/* Final Section as Component */}
      <FinalSection />
    </div>
  );
}
