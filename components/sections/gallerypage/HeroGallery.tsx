// 'use client';

// import React from 'react';
// import Image from 'next/image';

// export default function HeroGallery() {
//   return (
//     <section className="bg-[#171817] min-h-screen text-white md:py-8 py-0">
//       {/* Top Content Section */}
//       <div className="md:min-h-[80vh] min-h-[50vh] flex flex-col gap-4 items-start justify-center px-6 md:px-20">
//         <p>✦ Explore some of our client work below.</p>
//         <h1 className="text-[2rem] sm:text-4xl md:text-7xl font-extrabold leading-tight">
//           <span className="block md:hidden">
//             Our Results-Driven <br />
//             Project Showcase
//           </span>
//           <span className="hidden md:block">
//             Our Results- <br />
//             Driven Project <br />
//             Showcase
//           </span>
//         </h1>
//       </div>

//       {/* Image Section */}
//       <div className="w-full flex justify-center items-center overflow-hidden bg-[#171817]">
//         <div className="w-full max-w-7xl min-h-[50vh]">
//           <Image
//             src="/assets/gallery/1.avif"
//             alt="Project Showcase Image"
//             width={1920}
//             height={1080}
//             className="w-full p-4 h-[60vh] md:h-[100vh]  object-cover rounded-t-lg"
//             priority
//           />
//         </div>
//       </div>

//       {/* Button aligned to right */}
//       <div className="flex justify-end px-6 md:px-20 mt-6">
//         <button className="text-white border border-white px-6 py-2 rounded-3xl">
//           Work with us
//         </button>
//       </div>
//     </section>
//   );
// }
'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroGallery() {
  return (
    <section className="bg-[#171817] min-h-screen flex flex-col justify-between text-white py-32 md:py-32">
      {/* Top Content Section */}
      <div className="flex flex-col gap-4 justify-center px-6 md:px-20">
        <p className="text-sm md:text-base">✦ Explore some of our client work below.</p>
        <h1 className="text-[2rem] sm:text-4xl md:text-7xl font-extrabold leading-tight">
          <span className="block md:hidden">
            Our Results-Driven <br />
            Project Showcase
          </span>
          <span className="hidden md:block">
            Our Results- <br />
            Driven Project <br />
            Showcase
          </span>
        </h1>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center items-center overflow-hidden bg-[#171817] py-12 md:py-20">
        <div className="w-full max-w-7xl px-4">
          <Image
            src="/assets/gallery/1.avif"
            alt="Project Showcase Image"
            width={1920}
            height={1080}
            className="w-full h-[60vh] sm:h-[60vh] md:h-[100vh] object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Button aligned to right */}
      <div className="flex justify-end px-6 md:px-20">
        <button className="text-white border border-white px-6 py-2 rounded-3xl text-sm md:text-base">
          Work with us
        </button>
      </div>
    </section>
  );
}

