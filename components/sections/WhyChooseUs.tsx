
// 'use client';

// import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function WhyChooseUs() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (section) {
//       gsap.fromTo(
//         section,
//         {
//           backgroundColor: '#ffffff',
//           color: '#000000',
//         },
//         {
//           backgroundColor: '#171817',
//           color: '#ffffff',
//           duration: 1,
//           ease: 'power2.inOut',
//           scrollTrigger: {
//             trigger: section,
//             start: 'top top',
//             end: 'top top',
//             scrub: true,
//           },
//         }
//       );
//     }
//   }, []);

//   const features = [
//     {
//       title: 'Specialists In The Building Industry',
//       desc: 'We know your industry inside-out and understand what potential clients are looking for. Showcase your expertise and build trust instantly.',
//       icon: '✨',
//     },
//     {
//       title: 'Data-Driven Design',
//       desc: "Every website is custom-built and optimised with usability data and UX design principals to turn visitors into clients. While aligning to your brand's aesthetic language.",
//       icon: '⚡',
//     },
//     {
//       title: 'Captivating Digital Solutions',
//       desc: 'We create digital experiences that your visitors will remember. Our websites are designed to impress and engage potential clients within seconds.',
//       icon: '🎨',
//     },
//   ];

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen  transition-colors px-6 md:px-20 py-24"
//       style={{ backgroundColor: '#171817', color: '#000000' }} // ✅ Set default inline styles
//     >
//       <p className="py-4">✦ Tell your story through web design.</p>
//       <h2 className="text-4xl md:text-6xl font-extrabold text-start mb-20">
//         Why Clients Choose Us
//       </h2>

//      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//   {features.map((feature, i) => (
//     <div
//       key={i}
//       className="bg-[#171817] text-white p-8 rounded-lg border border-[#DDF694] shadow-[0px_0px_25px_6px_#6F7C4E] hover:shadow-[0px_0px_35px_8px_#6F7C4E] transition duration-300 ease-in-out"
//     >
//       <div className="text-5xl mb-6">{feature.icon}</div>
//       <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//       <p className="text-neutral-300 text-sm leading-relaxed">{feature.desc}</p>
//     </div>
//   ))}
// </div>

//     </section>
//   );
// }
'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (section) {
      gsap.fromTo(
        section,
        {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        {
          backgroundColor: '#171817',
          color: '#ffffff',
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }

    iconRefs.current.forEach((icon, index) => {
      if (!icon) return;

      gsap.set(icon, { transformOrigin: 'center' });

      const card = icon.closest('.feature-card');
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(icon, {
          y: -10,
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup on unmount
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  const features = [
    {
      title: 'Specialists In The Building Industry',
      desc: 'We know your industry inside-out and understand what potential clients are looking for. Showcase your expertise and build trust instantly.',
      icon: '✨',
    },
    {
      title: 'Data-Driven Design',
      desc: "Every website is custom-built and optimised with usability data and UX design principals to turn visitors into clients. While aligning to your brand's aesthetic language.",
      icon: '⚡',
    },
    {
      title: 'Captivating Digital Solutions',
      desc: 'We create digital experiences that your visitors will remember. Our websites are designed to impress and engage potential clients within seconds.',
      icon: '🎨',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen transition-colors px-6 md:px-20 py-24"
      style={{ backgroundColor: '#171817', color: '#000000' }}
    >
      <p className="py-4">✦ Tell your story through web design.</p>
      <h2 className="text-4xl md:text-6xl font-extrabold text-start mb-20">
        Why Clients Choose Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`feature-card bg-[#171817] text-white p-8 rounded-lg border border-[#DDF694] shadow-[0px_0px_25px_6px_#6F7C4E] hover:shadow-[0px_0px_35px_8px_#6F7C4E] transition duration-300 ease-in-out ${
              i === 1 ? 'md:translate-y-6' : i === 2 ? 'md:translate-y-12' : ''
            }`}
          >
            <div
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              className="text-5xl mb-6 flex justify-center"
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">
              {feature.title}
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed text-center">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

