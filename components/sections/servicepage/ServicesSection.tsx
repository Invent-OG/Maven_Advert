// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import Image from 'next/image';

// const services = [
//   { label: 'Website Design', icon: '/assets/icons/icon1.jpeg' },
//   { label: 'Development', icon: '/assets/icons/icon2.jpeg' },
//   { label: 'SEO + CMS', icon: '/assets/icons/icon3.jpeg' },
//   { label: 'Branding', icon: '/assets/icons/icon4.jpeg' },
// ];

// export default function ServicesSection() {
//   const iconRefs = useRef<HTMLDivElement[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

//   const handleMouseEnter = (index: number) => {
//     if (isMobile) return;
//     const icon = iconRefs.current[index];
//     if (icon) {
//       gsap.to(icon, { autoAlpha: 1, scale: 1, duration: 0.3 });
//     }
//   };

//   const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
//     if (isMobile) return;
//     const icon = iconRefs.current[index];
//     if (!containerRef.current || !icon) return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - containerRect.left;
//     const y = e.clientY - containerRect.top;

//     gsap.to(icon, {
//       x,
//       y,
//       ease: 'power2.out',
//       duration: 0.3,
//     });
//   };

//   const handleMouseLeave = (index: number) => {
//     if (isMobile) return;
//     const icon = iconRefs.current[index];
//     if (icon) {
//       gsap.to(icon, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
//     }
//   };

//   useEffect(() => {
//     if (!isMobile) {
//       iconRefs.current.forEach((ref) => {
//         gsap.set(ref, { autoAlpha: 0, scale: 0.5 });
//       });
//     }
//   }, [isMobile]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-6 bg-[#121312] grid grid-cols-1 md:grid-cols-2 overflow-hidden px-6 md:px-10"
//     >
//       {/* Icons only for desktop */}
//       {!isMobile &&
//         services.map((service, index) => (
//           <div
//             key={index}
//             ref={(el) => {
//               if (el) iconRefs.current[index] = el;
//             }}
//             className="absolute w-32 h-32 pointer-events-none z-50"
//           >
//             <Image
//               src={service.icon}
//               alt={service.label}
//               fill
//               className="object-contain"
//             />
//           </div>
//         ))}

//       {/* Left side empty on desktop */}
//       <div className="hidden md:block" />

//       {/* Right side with text, fully responsive */}
//       <div className="flex flex-col justify-center items-end md:gap-6 gap-0 w-full">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="w-full py-6 text-right cursor-pointer text-gray-300 hover:text-white text-3xl md:text-5xl font-bold transition-colors"
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseMove={(e) => handleMouseMove(index, e)}
//             onMouseLeave={() => handleMouseLeave(index)}
//           >
//             {service.label}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const services = [
  { label: 'Website Design', icon: '/assets/icons/icon1.jpeg' },
  { label: 'Development', icon: '/assets/icons/icon2.jpeg' },
  { label: 'SEO + CMS', icon: '/assets/icons/icon3.jpeg' },
  { label: 'Branding', icon: '/assets/icons/icon4.jpeg' },
];

export default function ServicesSection() {
  const iconRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const icon = iconRefs.current[index];
    if (!icon || !containerRef.current) return;

    // Set position first before showing
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    gsap.set(icon, { x, y });
    gsap.to(icon, { autoAlpha: 1, scale: 1, duration: 0.3 });
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const icon = iconRefs.current[index];
    if (!icon || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Set position instantly without tween (to avoid drift)
    gsap.set(icon, { x, y });
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile) return;
    const icon = iconRefs.current[index];
    if (icon) {
      gsap.to(icon, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
    }
  };

  useEffect(() => {
    if (!isMobile) {
      iconRefs.current.forEach((ref) => {
        gsap.set(ref, { autoAlpha: 0, scale: 0.5 });
      });
    }
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative py-6 bg-[#121312] grid grid-cols-1 md:grid-cols-2 overflow-hidden px-6 md:px-10"
    >
      {/* Floating Icons */}
      {!isMobile &&
        services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) iconRefs.current[index] = el;
            }}
            className="absolute w-32 h-32 pointer-events-none z-50"
          >
            <Image
              src={service.icon}
              alt={service.label}
              fill
              className="object-contain"
            />
          </div>
        ))}

      {/* Left spacer */}
      <div className="hidden md:block" />

      {/* Right content */}
      <div className="flex flex-col justify-center items-end md:gap-6 gap-0 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full py-6 text-right cursor-pointer text-gray-300 hover:text-white text-3xl md:text-5xl font-bold transition-colors"
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {service.label}
          </div>
        ))}
      </div>
    </section>
  );
}
