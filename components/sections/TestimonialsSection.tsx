// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import CTASection from './CTASection';

// const testimonials = [
//   {
//     name: 'Nick',
//     text: 'Impeccable service and even better results! Cheers Nexus Digital for the quality work.',
//     image: '/assets/gallery/1.avif',
//   },
//   {
//     name: 'Aisha',
//     text: 'Working with the team was seamless. Delivered everything on time!',
//     image: '/assets/gallery/2.avif',
//   },
//   {
//     name: 'Rahul',
//     text: 'They really understood our vision and brought it to life.',
//     image: '/assets/gallery/3.avif',
//   },
// ];

// export default function FloatingTestimonials() {
//   const [index, setIndex] = useState(0);
//   const cardRef = useRef<HTMLDivElement | null>(null);
//   const imageRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       gsap.to([cardRef.current, imageRef.current], {
//         opacity: 0,
//         y: -20,
//         duration: 0.4,
//         onComplete: () => {
//           setIndex((prev) => (prev + 1) % testimonials.length);
//           gsap.fromTo(
//             [cardRef.current, imageRef.current],
//             { opacity: 0, y: 20 },
//             { opacity: 1, y: 0, duration: 0.4 }
//           );
//         },
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const { name, text, image } = testimonials[index];
//   const isEven = index % 2 === 0;

//   return (
//     <section className="min-h-screen bg-[#171817] relative">
//       <div className="sticky top-20 h-screen flex items-center justify-center">
//         <div className="relative w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-6">
//           {/* Image */}
//           <div ref={imageRef} className="flex-shrink-0 w-full sm:w-3/4 md:w-[500px]">
//             <Image
//               src={image}
//               alt={`${name}'s testimonial`}
//               width={400}
//               height={500}
//               className="rounded-lg w-full h-auto shadow-xl object-cover"
//               unoptimized
//             />
//           </div>

//           {/* Testimonial Card */}
//           <div
//             ref={cardRef}
//             className={`absolute top-4 md:top-0 ${
//               isEven ? 'md:right-0' : 'md:left-0'
//             } bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10 mx-auto`}
//           >
//             <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
//               “{text}”
//             </p>
//             <span className="font-semibold text-black block text-right">— {name}</span>
//           </div>
//         </div>
//       </div>
//       <CTASection />
//     </section>
//   );
// }
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import CTASection from './CTASection';
import AnimatedHeading from './AnimatedHeading';

const testimonials = [
  {
    name: 'Nick',
    text: 'Impeccable service and even better results! Cheers Nexus Digital for the quality work.',
    image: '/assets/gallery/1.avif',
  },
  {
    name: 'Aisha',
    text: 'Working with the team was seamless. Delivered everything on time!',
    image: '/assets/gallery/2.avif',
  },
  {
    name: 'Rahul',
    text: 'They really understood our vision and brought it to life.',
    image: '/assets/gallery/3.avif',
  },
];

export default function FloatingTestimonials() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to([cardRef.current, imageRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % testimonials.length);
          gsap.fromTo(
            [cardRef.current, imageRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 }
          );
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { name, text, image } = testimonials[index];
  const isEven = index % 2 === 0;

  return (
    <section className="bg-[#171817] relative pt-16">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        {/* <h2 className="text-4xl md:text-5xl font-bold text-white">Testimonials</h2> */}
        <AnimatedHeading className="text-4xl md:text-5xl font-bold text-white" text='Testimonials'/>
        <p className="text-gray-400 mt-4 text-base md:text-lg">
          Hear what our happy clients have to say
        </p>
      </div>

      {/* Sticky Content */}
      {/* <div className="sticky top-0 min-h-screen flex items-center justify-center"> */}
      <div className="sticky top-0 flex items-center justify-center py-20">

        <div className="relative w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Image */}
          <div
            ref={imageRef}
            className="flex-shrink-0 w-full sm:w-4/5 md:w-[500px] lg:w-[600px] transition-all duration-300"
          >
            <Image
              src={image}
              alt={`${name}'s testimonial`}
              width={600}
              height={700}
              className="rounded-xl w-full h-auto shadow-2xl object-cover"
              unoptimized
            />
          </div>

          {/* Testimonial Card */}
          <div
            ref={cardRef}
            className={`absolute top-4 md:top-0 ${
              isEven ? 'md:right-0' : 'md:left-0'
            } bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10 mx-auto`}
          >
            <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
              “{text}”
            </p>
            <span className="font-semibold text-black block text-right">— {name}</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </section>
  );
}
