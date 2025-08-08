"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import gsap from "gsap";
import CTASection from "./CTASection";
import AnimatedHeading from "./AnimatedHeading";

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  content: string;
  imageUrl?: string | null;
  youtubeUrl?: string | null;
  image_url?: string | null;
};

export default function FloatingTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const json = await res.json();
        setTestimonials(json.testimonials ?? []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
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
  }, [testimonials]);

  if (loading) {
    return (
      <section className="bg-[#171817] py-16 text-center text-white">
        Loading testimonials…
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#171817] py-16 text-center text-red-500">
        {error}
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-[#171817] py-16 text-center text-gray-400">
        No testimonials found.
      </section>
    );
  }

  const current = testimonials[index];
  const isEven = index % 2 === 0;
  const imageSrc =
    current.imageUrl ?? current.image_url ?? "/images/placeholder-avatar.png";

  return (
    <section className="bg-[#171817] relative pt-16">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <AnimatedHeading
          className="text-4xl md:text-5xl font-bold text-white"
          text="Testimonials"
        />
        <p className="text-gray-400 mt-4 text-base md:text-lg">
          Hear what our happy clients have to say
        </p>
      </div>

      {/* Sticky Content */}
      <div className="sticky top-0 flex items-center justify-center py-20">
        <div className="relative w-full max-w-6xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Image */}
          <div
            ref={imageRef}
            className="flex-shrink-0 w-full sm:w-4/5 md:w-[500px] lg:w-[600px] transition-all duration-300"
          >
            <Image
              src={imageSrc}
              alt={`${current.name}'s testimonial`}
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
              isEven ? "md:right-0" : "md:left-0"
            } bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10 mx-auto`}
          >
            <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
              “{current.content}”
            </p>
            <div className="flex items-center justify-between gap-2">
              {current.youtubeUrl && (
                <a
                  href={current.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  <FaYoutube size={22} />
                </a>
              )}
              <span className="font-semibold text-black">— {current.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </section>
  );
}
