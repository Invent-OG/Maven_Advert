
'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const HowSection = () => {

  return (
    <section className="bg-neutral-900 flex flex-col justify-end items-end px-6 md:px-16 py-32">
      <AnimatedHeading text='How?' className="text-4xl md:text-8xl font-bold mb-4" 
      scrubSpeed={0.1}
startOffset={5}
endOffset={10}/>
      <p className="text-lg md:text-xl text-neutral-400 max-w-2xl">
        This is how we do it.
      </p>
    </section>
  );
};

export default HowSection;
