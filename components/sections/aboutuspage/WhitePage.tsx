"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "../AnimatedHeading";
import AnimatedButton from "@/components/ui/AnimatedButton";
import router from "next/router";

gsap.registerPlugin(ScrollTrigger);

export default function WhitePage() {
  const whiteSectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      ScrollTrigger.create({
        trigger: whiteSectionRef.current,
        start: "top bottom",
        end: "bottom center",
        onEnter: () => {
          gsap.to(document.body, {
            backgroundColor: "#ffffff",
            color: "#000000",
            duration: 0.2,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to(document.body, {
            backgroundColor: "#000000",
            color: "#ffffff",
            duration: 0.1,
            ease: "power2.inOut",
          });
        },
      });
      // ✅ Letter-by-letter animation (unchanged)
      const MOBILE_SCROLL_OFFSET = 4;
      const DESKTOP_SCROLL_STEP = 8;

      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        const startTrigger = isMobile
          ? `top+=${i * MOBILE_SCROLL_OFFSET}px end`
          : `top+=${i * DESKTOP_SCROLL_STEP}px end`;

        gsap.fromTo(
          el,
          { color: "#9CA3AF" },
          {
            color: "#000000",
            scrollTrigger: {
              trigger: el,
              start: startTrigger,
              end: "top center",
              scrub: true,
            },
          }
        );
      });
    }, whiteSectionRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [isMobile]);

  const text = "Our Results-Driven\nPhilosophy";

  return (
    <div>
      <section
        ref={whiteSectionRef}
        className="min-h-screen sticky top-0  flex flex-col items-center px-4 "
      >
        {/* Animated Heading */}
        <div
          ref={titleRef}
          className="text-center text-4xl sm:text-6xl md:text-[5.5rem] md:py-0 py-24 font-extrabold leading-snug "
        >
          {[...text].map((char, i) => {
            if (char === "\n") return <br key={`br-${i}`} />;
            if (char === " ") {
              return (
                <span key={`space-${i}`} className="inline-block w-[0.4em]">
                  {" "}
                </span>
              );
            }
            return (
              <span
                key={i}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="inline-block"
                style={{ color: "#9CA3AF" }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Left-aligned paragraph */}
        <div className="w-full max-w-3xl px-4 md:px-0 self-start md:mt-32 md:pl-16">
          <p className="text-sm md:text-base font-medium text-black mb-2">
            ✦ Showcase your story through design
          </p>
          <p className="text-3xl md:text-6xl font-extrabold text-gray-300 leading-tight">
            If you appreciate the beauty in simplicity and value quality...
          </p>
        </div>
      </section>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#171817] px-4 text-center z-20">
        <AnimatedHeading
          text="Let's Talk"
          fromColor="#4e4e4e"
          toColor="#d4d4d8"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          scrubSpeed={0.10}
startOffset={7}
endOffset={7}
        />
        {/* <button className="text-white rounded-3xl border border-lime-200 px-6 py-2 font-medium shadow-[0_4px_30px_rgba(163,230,53,0.5)] hover:shadow-[0_6px_40px_rgba(163,230,53,0.7)] transition-all duration-300">
          Book A Call
        </button> */}
        <AnimatedButton onClick={() => router.push("/contact")} className="">
          Book A Call
        </AnimatedButton>
      </section>
    </div>
  );
}
