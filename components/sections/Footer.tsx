"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Instagram, Linkedin, Dribbble } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const lettersRef = useRef<HTMLSpanElement[]>([]);

 useEffect(() => {
  const ctx = gsap.context(() => {
    if (!lettersRef.current.length) return;

    gsap.fromTo(
      lettersRef.current,
      {
        y: -50,
        opacity: 0,
        position: "absolute",  // keeps them from affecting each other's layout during animation
      },
      {
        y: 0,
        opacity: 1,
        position: "static",    // restores their natural flow after animation
        ease: "power3.out",
        stagger: {
          each: 0.1,
          from: "start",
        },
        scrollTrigger: {
          trigger: ".nexus-container",
          start: "top bottom",
          end: "bottom 90%",
          scrub: 1,
        },
      }
    );
  });

  return () => ctx.revert();
}, []);




  const letters = ["m", "a", "v", "e", "n"];

  return (
    <footer className="min-h-screen bg-black text-white px-6 md:px-12 py-12 flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex flex-col  md:flex-row justify-between items-start md:items-center">
        <p className="mb-6 md:mb-0 pl-8 text-xs md:text-sm text-gray-200">
          Let's go home ↑
        </p>

        <nav className="flex flex-col md:flex-row pr-10 gap-12 text-gray-200 text-xl font-medium">
          <Link href="#services" className="hover:text-white transition">
            ✦ Services
          </Link>
          <Link href="#gallery" className="hover:text-white transition">
            ✦ Gallery
          </Link>
          <Link href="#about" className="hover:text-white transition">
            ✦ About
          </Link>
          <Link href="#contact" className="hover:text-white transition">
            ✦ Contact
          </Link>
        </nav>
      </div>

      {/* Animated NEXUS Brand Section */}
      <div className="nexus-container text-start px-6 py-10 text-white">
  {/* NEXUS Heading */}
  <div className="flex items-center space-x-0 text-9xl font-extrabold">
    <span className="text-3xl mr-2">✦</span>
    {letters.map((letter, idx) => (
      <span key={idx} className="relative inline-block overflow-visible">
        <span
          ref={(el) => {
            if (el) lettersRef.current[idx] = el;
          }}
          className="inline-block text-[200px]"
        >
          {letter}
        </span>
      </span>
    ))}
  </div>

  {/* Divider and Footer */}
  <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-200 gap-4">
    {/* Left Text */}
    <p className="text-sm">© 2025 Built by Nexus Digital Studio. All rights reserved.</p>

    {/* Middle Links */}
    <div className="flex flex-wrap gap-4 md:pr-72 pr-10 text-sm">
      <Link href="#" className="hover:text-white">Privacy Policy</Link>
      <Link href="#" className="hover:text-white">Terms</Link>
      <Link href="#" className="hover:text-white">Accessibility</Link>
      <Link href="#" className="hover:text-white">FAQ's</Link>
    </div>

    {/* Social Icons */}
    <div className="flex gap-16">
      <Link href="#" aria-label="Instagram" className="hover:text-white">
        <Instagram size={18} />
      </Link>
      <Link href="#" aria-label="LinkedIn" className="hover:text-white">
        <Linkedin size={18} />
      </Link>
      <Link href="#" aria-label="Dribbble" className="hover:text-white">
        <Dribbble size={18} />
      </Link>
    </div>
  </div>
</div>

    </footer>
  );
}
