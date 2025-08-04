// 'use client';

// import React from 'react';
// import Image from 'next/image';

// function ServicesImages() {
//   return (
//     <div className="w-full min-h-screen p-10 flex items-center justify-center bg-[#121312]">
//       <div className=" max-w-6xl mx-auto ">
//         <Image
//           src="/assets/services/6763549996f2d8661b1730d7_mode-iphone-hero-mockup.avif" 
//           alt="Services"
//           width={1920}
//           height={1080}
//           className="w-full h-full rounded-xl object-cover"
//           priority
//         />
//       </div>
//     </div>
//   );
// }

// export default ServicesImages;
'use client';

import React from 'react';
import Image from 'next/image';

function ServicesImages() {
  return (
    <div className="w-full  lg:min-h-screen md:min-h-screen min-h-[40vh] p-2 md:py-10 flex items-start md:items-center justify-center bg-[#171817]">
      <div className="max-w-6xl mx-auto w-full">
        <Image
          src="/assets/services/6763549996f2d8661b1730d7_mode-iphone-hero-mockup.avif"
          alt="Services"
          width={1920}
          height={1080}
          className="w-full h-full  rounded-xl object-cover"
          priority
        />
      </div>
    </div>
  );
}

export default ServicesImages;
