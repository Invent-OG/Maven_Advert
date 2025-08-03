'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import clsx from 'clsx';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
}

export default function WhiteButton({
  children,
  className,
  type = 'button',
  onClick,
  href,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          duration: 1.8,
        }
      );
    }
  }, []);

  const handleClick = () => {
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      className={clsx(
        // ✅ Exact colors and styles you requested:
        'px-6  py-3 rounded-full text-sm font-medium bg-white text-black shadow-[0_0_10px_2px_rgba(191,255,0,0.5)] transition hover:bg-lime-100 text-center',
        className
      )}
    >
      {children}
    </button>
  );
}
