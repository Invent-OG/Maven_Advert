// // 'use client';

// // import React, { useEffect, useRef } from 'react';
// // import gsap from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // gsap.registerPlugin(ScrollTrigger);

// // const HowSection = () => {
// //   const titleRef = useRef<HTMLHeadingElement | null>(null);
// //   const letterRefs = useRef<HTMLSpanElement[]>([]);

// //   useEffect(() => {
// //     const ctx = gsap.context(() => {
// //       if (!titleRef.current || letterRefs.current.length === 0) return;

// //       letterRefs.current.forEach((el, i) => {
// //         gsap.fromTo(
// //           el,
// //           { color: '#4B5563' }, // gray-600
// //           {
// //             color: '#ffffff',
// //             scrollTrigger: {
// //               trigger: titleRef.current,
// //               start: `top+=${i * 60}% center`, // each letter animates progressively
// //               end: `bottom center`,
// //               scrub: true,
// //             },
// //           }
// //         );
// //       });
// //     });

// //     return () => ctx.revert(); // cleanup
// //   }, []);

// //   const text = 'How?';

// //   return (
// //     <section className="bg-neutral-900 flex flex-col justify-end items-end text-gray-600 h-[30vh] px-6 md:px-20 py-32">
// //       <h1
// //         ref={titleRef}
// //         className="text-4xl md:text-8xl font-bold mb-4 text-gray-600"
// //       >
// //         {text.split('').map((char, i) => (
// //           <span
// //             key={i}
// //             ref={(el) => {
// //               if (el) letterRefs.current[i] = el;
// //             }}
// //             className="inline-block"
// //           >
// //             {char}
// //           </span>
// //         ))}
// //       </h1>
// //       <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
// //         This is how we do it.
// //       </p>
// //     </section>
// //   );
// // };

// // export default HowSection;
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const HowSection = () => {
//   const titleRef = useRef<HTMLHeadingElement | null>(null);
//   const letterRefs = useRef<HTMLSpanElement[]>([]);

//   useEffect(() => {
//     const isMobile = window.innerWidth < 768;

//     const ctx = gsap.context(() => {
//       if (!titleRef.current || letterRefs.current.length === 0) return;

//       letterRefs.current.forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { color: '#4B5563' }, // gray-600
//           {
//             color: '#ffffff',
//             scrollTrigger: {
//               trigger: el,
//               start: isMobile
//                 ? 'top top' // On mobile: start when letter hits top of screen
//                 : `top+=${i * 60}% center`, // On desktop: staggered from center
//               end: 'bottom center',
//               scrub: true,
//             },
//           }
//         );
//       });
//     });

//     return () => ctx.revert(); // cleanup
//   }, []);

//   const text = 'How?';

//   return (
//     <section className="bg-neutral-900 flex flex-col justify-end items-end text-gray-600  px-6 md:px-20 py-32">
//       <h1
//         ref={titleRef}
//         className="text-4xl md:text-8xl font-bold mb-4 text-gray-600"
//       >
//         {text.split('').map((char, i) => (
//           <span
//             key={i}
//             ref={(el) => {
//               if (el) letterRefs.current[i] = el;
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </h1>
//       <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
//         This is how we do it.
//       </p>
//     </section>
//   );
// };

// export default HowSection;
'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowSection = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on mount and resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      if (!titleRef.current || letterRefs.current.length === 0) return;

      letterRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { color: '#4B5563' }, // gray-600
          {
            color: '#ffffff',
            scrollTrigger: {
              trigger: el,
              start: isMobile ? 'top 80%' : `top+=${i * 60}% center`,
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert(); // cleanup GSAP context
    };
  }, [isMobile]);

  const text = 'How?';

  return (
    <section className="bg-neutral-900 flex flex-col justify-end items-end text-gray-600 px-6 md:px-20 py-32">
      <h1
        ref={titleRef}
        className="text-4xl md:text-8xl font-bold mb-4 text-gray-600"
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) letterRefs.current[i] = el;
              else letterRefs.current[i] = null;
            }}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
      <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
        This is how we do it.
      </p>
    </section>
  );
};

export default HowSection;
