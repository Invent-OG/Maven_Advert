'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function Home() {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpline(true);
    }, 1000); // delay by 1s AFTER page has loaded

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className='h-[100vh]'>
      {showSpline ? (
        <Spline scene="https://prod.spline.design/HWnmevWuj3p1HU0Y/scene.splinecode" />
      ) : (
        <div className='flex items-center justify-center h-full bg-black text-white'>
          Loading 3D...
        </div>
      )}
    </main>
  );
}
