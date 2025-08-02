// 'use client';

// import React from 'react';

// const videos = [
//   '/assets/herovideos/670bf3be6040f597f238f1be_67606f28c527493b12dfd4ee_nue-arch-jitter-video-socials-transcode.mp4',
//   '/assets/herovideos/670bf3be6040f597f238f1be_67619c440f289abeed007239_Elevate-short-desktop-part-01-transcode.mp4',
//   '/assets/herovideos/670bf3be6040f597f238f1be_676188d827f1ff560c311601_ardell-desktop-socials-part-01-transcode.mp4',
//   '/assets/herovideos/670bf3be6040f597f238f1be_67618657ce5c4a30072ecb95_patterson-preloader-web-transcode.mp4',
// ];

// export default function HeroVideos() {
//   const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
//     e.currentTarget.play();
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>) => {
//     const vid = e.currentTarget;
//     vid.pause();
//     vid.currentTime = 0;
//   };

//   return (
//     <div className="bg-white py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//       {videos.map((src, index) => (
//         <video
//           key={index}
//           src={src}
//           controls={false}
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           className="w-full h-auto rounded-lg shadow-lg object-cover cursor-pointer"
//         />
//       ))}
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from 'react';

const videos = [
  '/assets/herovideos/670bf3be6040f597f238f1be_67606f28c527493b12dfd4ee_nue-arch-jitter-video-socials-transcode.mp4',
  '/assets/herovideos/670bf3be6040f597f238f1be_67619c440f289abeed007239_Elevate-short-desktop-part-01-transcode.mp4',
  '/assets/herovideos/670bf3be6040f597f238f1be_676188d827f1ff560c311601_ardell-desktop-socials-part-01-transcode.mp4',
  '/assets/herovideos/670bf3be6040f597f238f1be_67618657ce5c4a30072ecb95_patterson-preloader-web-transcode.mp4',
];

export default function HeroVideos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!isMobile) {
      e.currentTarget.play();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!isMobile) {
      const video = e.currentTarget;
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="bg-white py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {videos.map((src, index) => (
        <video
          key={index}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          autoPlay={isMobile}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full h-auto rounded-lg shadow-lg object-cover cursor-pointer"
        />
      ))}
    </div>
  );
}
