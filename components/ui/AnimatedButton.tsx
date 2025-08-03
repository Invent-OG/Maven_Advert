
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type AnimatedButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function AnimatedButton({
  children,
  onClick,
  type = 'button',
  className = '',
  ...rest
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const glow1Ref = useRef<HTMLSpanElement | null>(null);
  const glow2Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const glow1 = glow1Ref.current;
    const glow2 = glow2Ref.current;

    if (!btn || !glow1 || !glow2) return;

    // Initially hide glows off-screen
    gsap.set(glow1, { x: '-150%', opacity: 0 });
    gsap.set(glow2, { x: '150%', opacity: 0 });

    const handleEnter = () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(
        glow1,
        { x: '-150%', opacity: 0 },
        { x: '150%', opacity: 0.9, duration: 1.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        glow2,
        { x: '150%', opacity: 0 },
        { x: '-150%', opacity: 0.9, duration: 1.2, ease: 'power2.out' }
      );
    };

    const handleLeave = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });

      gsap.to(glow1, {
        x: '-150%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
      gsap.to(glow2, {
        x: '150%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    };

    btn.addEventListener('mouseenter', handleEnter);
    btn.addEventListener('mouseleave', handleLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleEnter);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden z-10 px-6 py-2 rounded-full font-medium text-white bg-[#171817] border border-[#DDF694] shadow-[0px_0px_25px_6px_#6F7C4E] transition-transform duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {/* Glowing overlays */}
      <span
        ref={glow1Ref}
        className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
      >
        <span className="absolute w-full h-full bg-white blur-sm rounded-full" />
      </span>
      <span
        ref={glow2Ref}
        className="absolute top-0 left-0 w-2/3 h-full pointer-events-none"
      >
        <span className="absolute w-full h-full bg-white blur-sm rounded-full" />
      </span>

      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
