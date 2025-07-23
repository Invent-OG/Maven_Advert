// 'use client';

// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function ClientSuccessSection() {
//   const count78Ref = useRef<HTMLParagraphElement>(null);
//   const count92Ref = useRef<HTMLParagraphElement>(null);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const animateCount = (target: HTMLElement, endValue: number) => {
//         const obj = { val: 0 };

//         gsap.to(obj, {
//           val: endValue,
//           duration: 2,
//           ease: 'power1.out',
//           scrollTrigger: {
//             trigger: target,
//             start: 'top 80%',
//             toggleActions: 'play reverse play reverse',
//           },
//           onUpdate: () => {
//             if (target) {
//               target.innerText = `${Math.round(obj.val)}%`;
//             }
//           },
//         });
//       };

//       if (count78Ref.current) animateCount(count78Ref.current, 78);
//       if (count92Ref.current) animateCount(count92Ref.current, 92);
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen bg-white text-black px-6 md:px-20 py-16 flex flex-col justify-center"
//     >
//       <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
//         {/* Left Side - Heading */}
//         <div className="md:w-1/2">
//           <p className="text-sm font-medium text-black mb-3">✦ Our Client Success</p>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-300 leading-tight">
//             Transform Your Website Into A Job-Winning Machine
//           </h2>
//         </div>

//         {/* Right Side - Description */}
//         <div className="md:w-1/2 text-base md:text-lg text-neutral-600">
//           <p>
//             In the studio, we offer professional web design services that are proven to boost
//             conversion rates. Our team of experts combines stunning visuals with user-friendly
//             interfaces to create websites that captivate and convert visitors into clients.
//           </p>

//           {/* Stats Section */}
//           <div className="mt-16 flex flex-col  sm:flex-row">
//             <div className="sm:w-1/2">
//               <p ref={count78Ref} className="text-8xl font-extrabold text-black mb-2">
//                 0%
//               </p>
//               <p className="text-base text-neutral-700">
//                 Increased Organic Traffic and Job Win Rates
//               </p>
//             </div>
//             <div className="sm:w-1/2">
//               <p ref={count92Ref} className="text-8xl font-extrabold text-black mb-2">
//                 0%
//               </p>
//               <p className="text-base text-neutral-700">
//                 Improved Search Engine Rankings and Boosted Sales
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClientSuccessSection() {
  const count78Ref = useRef<HTMLParagraphElement>(null);
  const count92Ref = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateCount = (target: HTMLElement, endValue: number) => {
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: target,
          start: 'top 90%',
          once: true, // ✅ trigger only once
          onEnter: () => {
            gsap.to(obj, {
              val: endValue,
              duration: 2,
              ease: 'power1.out',
              onUpdate: () => {
                if (target) {
                  target.innerText = `${Math.round(obj.val)}%`;
                }
              },
            });
          },
        });
      };

      if (count78Ref.current) animateCount(count78Ref.current, 78);
      if (count92Ref.current) animateCount(count92Ref.current, 92);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white text-black px-6 md:px-20 py-16 flex flex-col justify-center"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Left Side - Heading */}
        <div className="md:w-1/2">
          <p className="text-sm font-medium text-black mb-3">✦ Our Client Success</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 leading-tight">
            Transform Your Website Into A Job-Winning Machine
          </h2>
        </div>

        {/* Right Side - Description */}
        <div className="md:w-1/2 text-base md:text-lg text-neutral-600">
          <p>
            In the studio, we offer professional web design services that are proven to boost
            conversion rates. Our team of experts combines stunning visuals with user-friendly
            interfaces to create websites that captivate and convert visitors into clients.
          </p>

          {/* Stats Section */}
          <div className="mt-16 flex flex-col sm:flex-row">
            <div className="sm:w-1/2">
              <p ref={count78Ref} className="text-8xl font-extrabold text-black mb-2">
                0%
              </p>
              <p className="text-base text-neutral-700">
                Increased Organic Traffic and Job Win Rates
              </p>
            </div>
            <div className="sm:w-1/2">
              <p ref={count92Ref} className="text-8xl font-extrabold text-black mb-2">
                0%
              </p>
              <p className="text-base text-neutral-700">
                Improved Search Engine Rankings and Boosted Sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
