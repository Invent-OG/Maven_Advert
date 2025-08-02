
// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// const steps = [
//   {
//     week: 'Week 01',
//     title: 'Discovery Call',
//     desc: 'Schedule a call where we take time to understand your company and the technical outcome. We then create a tailored project plan.',
//   },
//   {
//     week: 'Week 02',
//     title: 'Strategy & Branding',
//     desc: 'The project plan has been approved, and now the branding begins: foundational ideas, tones & visuals.',
//   },
//   {
//     week: 'Week 03',
//     title: 'Design & Development',
//     desc: 'Our expert design & dev team creates design that aligns with your brand standards and branding.',
//   },
//   {
//     week: 'Week 04',
//     title: 'Refinement',
//     desc: 'Together we will refine your design, and begin optimizing your website based on usability tests and final feedback.',
//   },
//   {
//     week: 'Week 05',
//     title: 'Website Launch',
//     desc: 'We share the assets, and support you post-launch to ensure a smooth and highly effective launch.',
//   },
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const lineRef = useRef<HTMLDivElement | null>(null);
//   const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (!containerRef.current || !lineRef.current) return;

//     // Animate the vertical line
//     gsap.fromTo(
//       lineRef.current,
//       { height: '0%' },
//       {
//         height: '100%',
//         ease: 'none',
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top 20%',
//           end: 'bottom bottom',
//           scrub: true,
//         },
//       }
//     );

//     // Animate each dot from light gray to black
//     dotRefs.current.forEach((dot, i) => {
//       if (!dot) return;
//       gsap.fromTo(
//         dot,
//         { backgroundColor: '#d1d5db' }, // Tailwind gray-300
//         {
//           backgroundColor: '#000000',
//           scrollTrigger: {
//             trigger: dot,
//             start: 'top center',
//             toggleActions: 'play none none reverse',
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row gap-12">
//       {/* LEFT */}
//       <div className="md:w-1/2 sticky top-16 space-y-6 h-fit">
//         <p className="text-sm uppercase text-black tracking-wide">★ Our Process</p>
//         <h2 className="text-[5.5rem] font-bold text-neutral-300 leading-tight">
//           From <br /> Consult to<br />
//            Project <br />
//           Launch
//         </h2>
//         <div className="flex gap-3 pt-2">
//           <Link
//     href="/contact"
//     className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
//   >
//     Work With Us
//   </Link>
//           <button className="border border-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-100">
//             Contact Us
//           </button>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div ref={containerRef} className="md:w-1/2 relative pl-8">
//         {/* Vertical Line */}
//         <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200">
//           <div ref={lineRef} className="bg-black w-[3px] h-0 origin-top"></div>
//         </div>

//         {/* Steps */}
//         <div className="space-y-52">
//           {steps.map((step, index) => (
//             <div key={index} className="relative pl-20 ">
//               {/* Dot */}
//               <div
//                 ref={(el) => {(dotRefs.current[index] = el)}}
//                 className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gray-300 z-10 transition-all duration-300"
//               ></div>

//               {/* Content */}
//               <p className="text-sm font-semibold text-gray-500 mb-4">{step.week}</p>
//               <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
//               <p className="text-gray-400 max-w-lg">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// 'use client';

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// const steps = [
//   {
//     week: 'Week 01',
//     title: 'Discovery Call',
//     desc: 'Schedule a call where we take time to understand your company and the technical outcome. We then create a tailored project plan.',
//   },
//   {
//     week: 'Week 02',
//     title: 'Strategy & Branding',
//     desc: 'The project plan has been approved, and now the branding begins: foundational ideas, tones & visuals.',
//   },
//   {
//     week: 'Week 03',
//     title: 'Design & Development',
//     desc: 'Our expert design & dev team creates design that aligns with your brand standards and branding.',
//   },
//   {
//     week: 'Week 04',
//     title: 'Refinement',
//     desc: 'Together we will refine your design, and begin optimizing your website based on usability tests and final feedback.',
//   },
//   {
//     week: 'Week 05',
//     title: 'Website Launch',
//     desc: 'We share the assets, and support you post-launch to ensure a smooth and highly effective launch.',
//   },
// ];

// export default function ProcessTimeline() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const lineRef = useRef<HTMLDivElement | null>(null);
//   const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (!containerRef.current || !lineRef.current) return;

//     // Animate the vertical line
//     gsap.fromTo(
//       lineRef.current,
//       { height: '0%' },
//       {
//         height: '100%',
//         ease: 'none',
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top 20%',
//           end: 'bottom bottom',
//           scrub: true,
//         },
//       }
//     );

//     // Animate each dot from light gray to black
//     dotRefs.current.forEach((dot, i) => {
//       if (!dot) return;
//       gsap.fromTo(
//         dot,
//         { backgroundColor: '#d1d5db' },
//         {
//           backgroundColor: '#000000',
//           scrollTrigger: {
//             trigger: dot,
//             start: 'top center',
//             toggleActions: 'play none none reverse',
//           },
//         }
//       );
//     });
//   }, []);

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row gap-20 md:gap-12">
//       {/* LEFT (on top in mobile) */}
//       <div className="md:w-1/2 space-y-6 h-fit sticky md:static top-16">
//         <p className="text-sm uppercase text-black tracking-wide">★ Our Process</p>
//         <h2 className="text-[2.8rem] sm:text-[3.5rem] md:text-[5.5rem] font-bold text-neutral-300 leading-tight">
//           From <br className="hidden sm:block" />
//           Consult to <br className="hidden sm:block" />
//           Project <br className="hidden sm:block" />
//           Launch
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-2">
//           <Link
//             href="/contact"
//             className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
//           >
//             Work With Us
//           </Link>
//           <button className="border border-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-100">
//             Contact Us
//           </button>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div ref={containerRef} className="md:w-1/2 relative pl-8">
//         {/* Vertical Line */}
//         <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200">
//           <div ref={lineRef} className="bg-black w-[3px] h-0 origin-top"></div>
//         </div>

//         {/* Steps */}
//         <div className="space-y-40 sm:space-y-52">
//           {steps.map((step, index) => (
//             <div key={index} className="relative pl-20">
//               {/* Dot */}
//               <div
//                 ref={(el) => {
//                   dotRefs.current[index] = el;
//                 }}
//                 className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gray-300 z-10 transition-all duration-300"
//               ></div>

//               {/* Content */}
//               <p className="text-sm font-semibold text-gray-500 mb-4">{step.week}</p>
//               <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
//               <p className="text-gray-400 max-w-lg">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    week: 'Week 01',
    title: 'Discovery Call',
    desc: 'Schedule a call where we take time to understand your company and the technical outcome. We then create a tailored project plan.',
  },
  {
    week: 'Week 02',
    title: 'Strategy & Branding',
    desc: 'The project plan has been approved, and now the branding begins: foundational ideas, tones & visuals.',
  },
  {
    week: 'Week 03',
    title: 'Design & Development',
    desc: 'Our expert design & dev team creates design that aligns with your brand standards and branding.',
  },
  {
    week: 'Week 04',
    title: 'Refinement',
    desc: 'Together we will refine your design, and begin optimizing your website based on usability tests and final feedback.',
  },
  {
    week: 'Week 05',
    title: 'Website Launch',
    desc: 'We share the assets, and support you post-launch to ensure a smooth and highly effective launch.',
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Animate the vertical line
    gsap.fromTo(
      lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    // Animate each dot from gray to black
    dotRefs.current.forEach((dot) => {
      if (!dot) return;
      gsap.fromTo(
        dot,
        { backgroundColor: '#d1d5db' },
        {
          backgroundColor: '#000000',
          scrollTrigger: {
            trigger: dot,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:py-28 flex flex-col md:flex-row gap-20 md:gap-12">
      {/* LEFT (Sticky on md+, normal on mobile) */}
      <div className="md:w-1/2 h-fit md:sticky md:top-16 space-y-6">
        <p className="text-sm uppercase text-black tracking-wide">★ Our Process</p>
        <h2 className="text-[2.8rem] sm:text-[3.5rem] md:text-[5.5rem] font-bold text-neutral-300 leading-tight">
          From <br className="hidden sm:block" />
          Consult to <br className="hidden sm:block" />
          Project <br className="hidden sm:block" />
          Launch
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-2">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center"
          >
            Work With Us
          </Link>
          <button className="border border-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-100">
            Contact Us
          </button>
        </div>
      </div>

      {/* RIGHT: Timeline with line and animated dots */}
      <div ref={containerRef} className="md:w-1/2 relative pl-8">
        {/* Vertical background line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-200">
          {/* Animated inner line */}
          <div ref={lineRef} className="bg-black w-[3px] h-0 origin-top"></div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-32 sm:space-y-40">
          {steps.map((step, index) => (
            <div key={index} className="relative md:pl-20 pl-10">
              {/* Dot */}
              <div
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
                className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gray-300 z-10 transition-all duration-300"
              ></div>

              {/* Text Content */}
              <p className="text-sm font-semibold text-gray-500 mb-4">{step.week}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-400 max-w-lg">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
