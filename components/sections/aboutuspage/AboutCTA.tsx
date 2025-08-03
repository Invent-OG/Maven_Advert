// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function AboutCTA() {
//   const sectionRef = useRef(null);
//   const textRef = useRef<HTMLHeadingElement | null>(null);
//   const letterRefs = useRef<HTMLSpanElement[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.refresh();

//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: 'top top',
//         end: '+=80%',
//         pin: true,
//         pinSpacing: true,
//         scrub: true,
//       });

//       const startOffset = 15;
//       const endOffset = 5;

//       letterRefs.current.forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { color: '#4B5563' }, // Initial gray-600
//           {
//             color: '#ffffff',
//             scrollTrigger: {
//               trigger: el,
//               start: `top+=${i * startOffset}px center`,
//               end: `top+=${i * startOffset + endOffset}px center`,
//               scrub: true,
//             },
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const text = `Let's Talk`;

//   return (
//     <section
//       ref={sectionRef}
//       className="relative z-[200] h-screen flex flex-col items-center justify-center bg-neutral-900 text-center px-4"
//     >
//       <h2
//         ref={textRef}
//         className="text-5xl md:text-7xl font-bold"
//       >
//         {text.split('').map((char, i) => (
//           <span
//             key={i}
//             ref={(el) => {
//               if (el) letterRefs.current[i] = el;
//             }}
//             className="inline-block"
//             style={{ color: '#4B5563' }} // gray-600
//           >
//             {char === ' ' ? '\u00A0' : char}
//           </span>
//         ))}
//       </h2>
//       <button
//         className="px-6 mt-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
//       >
//         Book A Call
//       </button>
//     </section>
//   );
// }
