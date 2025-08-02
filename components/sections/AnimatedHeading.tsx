'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  fromColor = '#4e4e4e',
  toColor = '#ffffff',
}) => {
  const sectionRef = useRef(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const startOffset = 15;
      const endOffset = 5;

      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.color = fromColor;

        gsap.to(el, {
          color: toColor,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * startOffset}px center`,
            end: `top+=${i * startOffset + endOffset}px center`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [fromColor, toColor]);

  

  return (
    <h1 ref={sectionRef} className={`font-bold ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el!;
          }}
          className="inline-block transition-colors duration-300"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;

// examples 
{/* <AnimatedHeading
  text="Our Results-Driven Philosophy"
  className="text-6xl text-center"
  fromColor="#4e4e4e"
  toColor="#eb4949"
/> */}
