// 'use client';

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Link from 'next/link';
// import { Instagram, Linkedin, Dribbble } from 'lucide-react';

// gsap.registerPlugin(ScrollTrigger);

// export default function Footer() {
//   const lettersRef = useRef<HTMLSpanElement[]>([]);
//   const navLinksRef = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Scroll-triggered letter animation
//       gsap.fromTo(
//         lettersRef.current,
//         {
//           y: -50,
//           opacity: 0,
//           position: 'absolute',
//         },
//         {
//           y: 0,
//           opacity: 1,
//           position: 'static',
//           ease: 'power3.out',
//           stagger: {
//             each: 0.1,
//             from: 'start',
//           },
//           scrollTrigger: {
//             trigger: '.nexus-container',
//             start: 'top bottom',
//             end: 'bottom 90%',
//             scrub: 1,
//           },
//         }
//       );

//       // Animate text on hover in/out
//       navLinksRef.current.forEach((wrapper) => {
//         const textEl = wrapper.querySelector('.text-slide');

//         if (!textEl) return;

//         let hoverTl = gsap.timeline({ paused: true });

//         hoverTl
//           .to(textEl, {
//             y: '-100%',
//             opacity: 0,
//             duration: 0.15,
//             ease: 'power1.in',
//           })
//           .set(textEl, { y: '100%' })
//           .to(textEl, {
//             y: '0%',
//             opacity: 1,
//             duration: 0.15,
//             ease: 'power1.out',
//           });

//         wrapper.addEventListener('mouseenter', () => hoverTl.play());
//         wrapper.addEventListener('mouseleave', () => hoverTl.reverse());
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   const navLinks = [
//     { label: '✦ Services', href: '#services' },
//     { label: '✦ Gallery', href: '#gallery' },
//     { label: '✦ About', href: '#about' },
//     { label: '✦ Contact', href: '#contact' },
//   ];

//   const letters = ['m', 'a', 'v', 'e', 'n'];

//   return (
//     <footer className="min-h-screen bg-black text-white px-6 md:px-12 py-12 flex flex-col justify-between">
//       {/* Top Row */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
//         <p className="pl-2 text-xs md:text-sm text-gray-200">Let's go home ↑</p>

//         <nav className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-neutral-400 text-lg md:text-2xl font-medium">
//           {navLinks.map((item, index) => (
//             <div
//               key={index}
//               ref={(el) => {
//                 if (el) navLinksRef.current[index] = el;
//               }}
//               className="relative h-[1.3em] overflow-hidden cursor-pointer"
//             >
//               <Link href={item.href}>
//                 <span className="block text-slide">{item.label}</span>
//               </Link>
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* Animated MAVEN Brand Section */}
//       <div className="nexus-container px-2 md:px-6 py-10 text-white overflow-hidden">
//         <div className="flex flex-wrap items-center text-6xl sm:text-7xl md:text-9xl lg:text-[200px] font-extrabold leading-none gap-2">
//           <span className="text-2xl sm:text-3xl mr-2">✦</span>
//           {letters.map((letter, idx) => (
//             <span key={idx} className="relative inline-block overflow-visible">
//               <span
//                 ref={(el) => {
//                   if (el) lettersRef.current[idx] = el;
//                 }}
//                 className="inline-block"
//               >
//                 {letter}
//               </span>
//             </span>
//           ))}
//         </div>

//         {/* Divider + Footer Bottom Row */}
//         <div className="border-t border-gray-300 pt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-xs text-gray-200 mt-8">
//           <p className="text-sm">
//             © 2025 Built by Nexus Digital Studio. All rights reserved.
//           </p>

//           <div className="flex flex-wrap gap-4 text-sm">
//             <Link href="#" className="hover:text-white">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="hover:text-white">
//               Terms
//             </Link>
//             <Link href="#" className="hover:text-white">
//               Accessibility
//             </Link>
//             <Link href="#" className="hover:text-white">
//               FAQ&apos;s
//             </Link>
//           </div>

//           <div className="flex gap-6 md:gap-8">
//             <Link href="#" aria-label="Instagram" className="hover:text-white">
//               <Instagram size={18} />
//             </Link>
//             <Link href="#" aria-label="LinkedIn" className="hover:text-white">
//               <Linkedin size={18} />
//             </Link>
//             <Link href="#" aria-label="Dribbble" className="hover:text-white">
//               <Dribbble size={18} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Instagram, Linkedin, Dribbble } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const navLinksRef = useRef<HTMLDivElement[]>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered letter animation
      gsap.fromTo(
        lettersRef.current,
        {
          y: -50,
          opacity: 0,
          position: "absolute",
        },
        {
          y: 0,
          opacity: 1,
          position: "static",
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".nexus-container",
            start: "center bottom",
            end: "bottom 90%",
            scrub: 1,
          },
        }
      );

      // Animate text on hover in/out
      navLinksRef.current.forEach((wrapper) => {
        const textEl = wrapper.querySelector(".text-slide");
        if (!textEl) return;

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(textEl, {
            y: "-100%",
            opacity: 0,
            duration: 0.15,
            ease: "power1.in",
          })
          .set(textEl, { y: "100%" })
          .to(textEl, {
            y: "0%",
            opacity: 1,
            duration: 0.15,
            ease: "power1.out",
          });

        wrapper.addEventListener("mouseenter", () => hoverTl.play());
        wrapper.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      // Underline animation for "Let's go home"
      if (underlineRef.current) {
        const underlineTl = gsap.timeline({ paused: true });
        underlineTl.fromTo(
          underlineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.25, ease: "power2.out" }
        );

        const textEl = underlineRef.current.parentElement;
        if (textEl) {
          textEl.addEventListener("mouseenter", () => underlineTl.play());
          textEl.addEventListener("mouseleave", () => underlineTl.reverse());
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "✦ Services", href: "/service" },
    { label: "✦ Gallery", href: "/gallery" },
    { label: "✦ About", href: "/aboutus" },
    { label: "✦ Contact", href: "/contact" },
  ];

  const letters = ["m", "a", "v", "e", "n"];

  return (
    <footer className="md:min-h-[120vh] min-h-screen bg-black text-white px-6 md:px-12 py-12 flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
        <p onClick={()=>router.push('/')} className="pl-2 py-2 text-xs md:text-sm text-gray-200 relative inline-block cursor-pointer">
          Let&apos;s go home ↑
          <span
            ref={underlineRef}
            className="absolute bottom-0  left-0 w-full h-[3px] bg-neutral-600 scale-x-0 origin-left block"
          ></span>
        </p>

        <nav className="flex flex-col sm:flex-row md:gap-6 gap-10 sm:gap-10 text-neutral-400 text-2xl md:text-2xl font-bold">
          {navLinks.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) navLinksRef.current[index] = el;
              }}
              className="relative h-[1.3em] overflow-hidden cursor-pointer"
            >
              <Link href={item.href}>
                <span className="block text-slide">{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="nexus-container px-2 md:px-6 py-10 text-white overflow-hidden">
        <div className="flex items-center font-extrabold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[200px] tracking-[-0.120em]">
          <span className="mr-[0.3em] text-[0.3em]">✦</span>
          <span className="block">
            <span className="inline-block">
              {letters.map((letter, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) lettersRef.current[idx] = el;
                  }}
                  className="inline-block"
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
        </div>

        {/* Divider + Footer Bottom Row */}
        <div className="border-t border-gray-300 pt-6 flex flex-col-reverse items-center gap-4 text-xs text-neutral-300 md:flex-row md:justify-between md:items-center">
          <p className="text-[12px] leading-snug text-center md:text-left">
            © 2025 Built by nexus digital studio. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-[12px] underline">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href="#" className="hover:text-white">
              Accessibility
            </Link>
            <Link href="#" className="hover:text-white">
              FAQ&apos;s
            </Link>
          </div>

          <div className="flex gap-6 md:gap-8 justify-center">
            {[
              { href: "#", label: "Instagram", icon: <Instagram size={20} /> },
              { href: "#", label: "LinkedIn", icon: <Linkedin size={20} /> },
              { href: "#", label: "Dribbble", icon: <Dribbble size={20} /> },
            ].map(({ href, label, icon }, i) => (
              <Link
                key={i}
                href={href}
                aria-label={label}
                className="group relative inline-flex items-center justify-center w-10 h-10 text-neutral-300 hover:text-white transition-colors duration-300"
              >
                <span className="absolute inset-0 rounded-full border border-neutral-300 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
