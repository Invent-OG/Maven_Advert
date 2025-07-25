import Image from 'next/image';
import React from 'react';
import AnimatedHeading from '../AnimatedHeading';

function AboutSecond() {
  return (
    <div className="md:min-h-screen bg-[#171817] flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20  py-20 text-left">
      <Image
        alt="aboutimg"
        src="/assets/heroimages/creative arts and design.webp"
        width={400}
        height={400}
        className="rounded-lg md:h-[60vh] md:w-[100vh] object-cover max-w-sm md:max-w-none"
      />
      <div className="max-w-xl flex flex-col gap-5">
        <AnimatedHeading
          text="Our Approach"
          className="text-4xl md:text-5xl mb-4 text-left"
        />
        <p className="text-gray-300 text-left text-sm md:text-base leading-relaxed">
          We don’t just create designs—we solve your problems. It all starts with listening.
          We dive deep into understanding your business, your challenges, and your goals. Then,
          we use data, creativity, and practical solutions to craft a plan that works.
          There are no unnecessary extras—just what makes sense for you.
        </p>
      </div>
    </div>
  );
}

export default AboutSecond;
