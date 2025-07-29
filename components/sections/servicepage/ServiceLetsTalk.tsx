// 'use client';
// import React from 'react';
// import { useEffect, useState } from 'react';
// import AnimatedHeading from '../AnimatedHeading';

// function ServiceLetsTalk() {
//   const [isSticky, setIsSticky] = useState(true);

//   // Disable sticky on small screens
//   useEffect(() => {
//     const handleResize = () => {
//       setIsSticky(window.innerWidth >= 768); // md breakpoint
//     };

//     handleResize(); // run once on mount
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <main className='relative w-full'>
//       {/* Sticky section */}
//       <section
//         className={`${
//           isSticky ? 'sticky top-0 h-screen' : 'h-auto'
//         } bg-white z-10 flex flex-col items-start justify-center pl-10 gap-10`}
//       >
//         <h2 className='text-lg text-black'>★ Let's start today</h2>
//         <p className='text-neutral-300 text-5xl md:text-6xl font-extrabold leading-tight'>
//           If winning more clients <br /> sounds good to you...
//         </p>
//       </section>

//       {/* Overlapping section */}
//       <section className='relative -mt-20 min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 z-20'>
//         {/* <p className='text-5xl md:text-6xl font-bold'>Let's Talk</p> */}
//          <AnimatedHeading
//           text="Let's Talk"
//           className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
//         />
//        <button className="text-white rounded-3xl border border-lime-200 px-6 py-2 font-semibold shadow-[0_4px_30px_rgba(163,230,53,0.5)] hover:shadow-[0_6px_40px_rgba(163,230,53,0.7)] transition-all duration-300">
//   Book A Call
// </button>

//       </section>
//     </main>
//   );
// }

// export default ServiceLetsTalk;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import AnimatedHeading from '../AnimatedHeading';

// function ServiceLetsTalk() {
//   const [isSticky, setIsSticky] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSticky(window.innerWidth >= 768); // Enable sticky only for md and above
//     };

//     handleResize(); // initial check
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <main className='relative w-full'>
//       {/* Sticky section */}
//       <section
//         className={`${
//           isSticky ? 'sticky top-0 h-screen' : 'h-auto'
//         } bg-white z-10 flex flex-col items-start justify-center px-4 md:px-10 py-16 gap-6 md:gap-10`}
//       >
//         <h2 className='text-base md:text-lg text-black'>★ Let's start today</h2>
//         <p className='text-neutral-300 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight'>
//           If winning more clients <br className='hidden sm:block' /> sounds good to you...
//         </p>
//       </section>

//       {/* Overlapping section */}
//       <section className='relative -mt-10 md:-mt-20 min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 px-4 text-center z-20'>
//         <AnimatedHeading
//           text="Let's Talk"
//           className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
//         />
//         <button className="text-white rounded-3xl border border-lime-200 px-6 py-2 font-semibold shadow-[0_4px_30px_rgba(163,230,53,0.5)] hover:shadow-[0_6px_40px_rgba(163,230,53,0.7)] transition-all duration-300">
//           Book A Call
//         </button>
//       </section>
//     </main>
//   );
// }

// export default ServiceLetsTalk;
'use client';
import React from 'react';
import AnimatedHeading from '../AnimatedHeading';

function ServiceLetsTalk() {
  return (
    <main className="relative w-full">
      {/* Sticky Section */}
      <section
        className="sticky top-0 h-screen bg-white z-10 flex flex-col items-start justify-start px-4 md:px-10 py-16 gap-6 md:gap-10"
      >
        <h2 className="text-base md:text-lg text-black">★ Let's start today</h2>
        <p className="text-neutral-300 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
          If winning more clients <br className="hidden sm:block" /> sounds good to you...
        </p>
      </section>

      {/* Overlapping Section */}
      <section className="relative -mt-10 md:-mt-20 min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 px-4 text-center z-20">
        <AnimatedHeading
          text="Let's Talk"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        />
        <button className="text-white rounded-3xl border border-lime-200 px-6 py-2 font-semibold shadow-[0_4px_30px_rgba(163,230,53,0.5)] hover:shadow-[0_6px_40px_rgba(163,230,53,0.7)] transition-all duration-300">
          Book A Call
        </button>
      </section>
    </main>
  );
}

export default ServiceLetsTalk;
