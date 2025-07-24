'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import CTASection from './CTASection';

const testimonials = [
  {
    name: 'Nick',
    companyLogo: '/logos/logo1.svg',
    text: 'Impeccable service and even better results! Cheers Nexus Digital for the quality work.',
    image: 'https://images.pexels.com/photos/18581950/pexels-photo-18581950.jpeg',
  },
  {
    name: 'Aisha',
    companyLogo: '/logos/logo2.svg',
    text: 'Working with the team was seamless. Delivered everything on time!',
    image: 'https://images.pexels.com/photos/18581950/pexels-photo-18581950.jpeg',
  },
  {
    name: 'Rahul',
    companyLogo: '/logos/logo3.svg',
    text: 'They really understood our vision and brought it to life.',
    image: 'https://images.pexels.com/photos/18581950/pexels-photo-18581950.jpeg',
  },
];

export default function FloatingTestimonials() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out
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

  const { name, companyLogo, text, image } = testimonials[index];
  const isEven = index % 2 === 0;

  return (
    <section className="min-h-[100vh] z-100 bg-black relative">
      {/* Sticky container */}
      <div className="sticky top-20 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-6xl flex justify-center items-center">
          {/* Testimonial Image */}
          <div ref={imageRef}>
            <Image
              src={image}
              alt={`${name}'s Testimonial`}
              width={400}
              height={600}
              unoptimized
              className="rounded-lg h-110 w-150 shadow-lg z-0"
            />
          </div>

          {/* Floating Card */}
          <div
            ref={cardRef}
            className={`absolute -top-10 ${
              isEven ? 'right-0' : 'left-0'
            } bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-10`}
          >
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">“{text}”</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-black">{name}</span>
              <Image
                src={companyLogo}
                alt={name}
                width={24}
                height={24}
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <CTASection/>
    </section>
  );
}
