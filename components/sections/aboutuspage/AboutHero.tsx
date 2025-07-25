'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="bg-[#171817] text-white">
      {/* Top Content Section */}
      <div className="min-h-[60vh] flex items-center justify-start px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Passionate About Design. <br />
          Driven By Novel <br />
          Solutions.
        </h1>
      </div>

      {/* Video Section */}
      <div className="w-full flex justify-center items-center overflow-hidden bg-[#171817]">
        <div className="w-full max-w-7xl h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full p-4 h-[30vh] md:h-[100vh] object-cover rounded-t-lg"
          >
            <source
              src="/assets/herovideos/670bf3be6040f597f238f1be_67618657ce5c4a30072ecb95_patterson-preloader-web-transcode.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
