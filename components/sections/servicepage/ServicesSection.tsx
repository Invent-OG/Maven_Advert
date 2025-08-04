// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import { gsap } from 'gsap';
// import Image from 'next/image';

// const services = [
//   { label: 'Website Design', icon: '/assets/icons/icon5.avif' },
//   { label: 'Development', icon: '/assets/icons/icon6.avif' },
//   { label: 'SEO + CMS', icon: '/assets/icons/icon7.avif' },
//   { label: 'Branding', icon: '/assets/icons/icon5.avif' },
// ];

// export default function ServicesSection() {
//   const iconRefs = useRef<HTMLDivElement[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Hydration-safe client check
//   useEffect(() => {
//     setMounted(true);

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize(); // Initial check
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
//     if (isMobile) return;
//     const icon = iconRefs.current[index];
//     if (!icon || !containerRef.current) return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - containerRect.left;
//     const y = e.clientY - containerRect.top;

//     gsap.set(icon, { x, y });
//     gsap.to(icon, { autoAlpha: 1, scale: 2, duration: 0.1 });
//   };

//   const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
//     if (isMobile) return;
//     const icon = iconRefs.current[index];
//     if (!icon || !containerRef.current) return;

//     const containerRect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - containerRect.left;
//     const y = e.clientY - containerRect.top;

//     gsap.set(icon, { x, y });
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
//         if (ref) {
//           gsap.set(ref, { autoAlpha: 0, scale: 0.5 });
//         }
//       });
//     }
//   }, [isMobile]);

//   if (!mounted) return null; // Prevent hydration mismatch

//   return (
//     <section
//       ref={containerRef}
//       className="relative py-6 bg-[#171817] grid grid-cols-1 md:grid-cols-2 overflow-hidden px-6 md:px-10"
//     >
//       {/* Floating Icons */}
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

//       {/* Left spacer */}
//       <div className="hidden md:block" />

//       {/* Right content */}
//       <div className="flex flex-col justify-center items-end md:gap-6 gap-0 w-full">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="w-full py-6 text-right cursor-pointer text-gray-300 hover:text-white text-3xl md:text-5xl font-bold transition-colors"
//             onMouseEnter={(e) => handleMouseEnter(index, e)}
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

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const services = [
  { label: 'Website Design', icon: '/assets/icons/icon5.avif' },
  { label: 'Development', icon: '/assets/icons/icon6.avif' },
  { label: 'SEO + CMS', icon: '/assets/icons/icon7.avif' },
  { label: 'Branding', icon: '/assets/icons/icon5.avif' },
];

export default function ServicesSection() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration-safe and responsive check
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize icons with hidden style
  useEffect(() => {
    if (!isMobile) {
      iconRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, { autoAlpha: 0, scale: 0.5 });
        }
      });
    }
  }, [isMobile]);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const icon = iconRefs.current[index];
    if (!icon) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    gsap.set(icon, { x, y });
    gsap.to(icon, { autoAlpha: 1, scale: 1.5, duration: 0.2 });
  };

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const icon = iconRefs.current[index];
    if (!icon) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    gsap.set(icon, { x, y });
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile) return;
    const icon = iconRefs.current[index];
    if (icon) {
      gsap.to(icon, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <section
      ref={containerRef}
      className="relative py-6 bg-[#171817] grid grid-cols-1 md:grid-cols-2 overflow-hidden px-6 md:px-10 min-h-screen"
    >
      {/* Floating Icons */}
      {!isMobile &&
        services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              iconRefs.current[index] = el;
            }}
            className="absolute w-32 h-32 pointer-events-none z-0"
          >
            <Image
              src={service.icon}
              alt={service.label}
              fill
              className="object-contain"
            />
          </div>
        ))}

      {/* Left spacer column */}
      <div className="hidden md:block" />

      {/* Right: Service labels */}
<div className="flex flex-col justify-center items-end md:gap-6 gap-0 w-full relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full py-6 z-10 text-right cursor-pointer text-gray-300 hover:text-white text-3xl md:text-5xl font-bold transition-colors"
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
