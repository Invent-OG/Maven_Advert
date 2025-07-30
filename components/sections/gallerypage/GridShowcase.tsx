'use client';

import Image from 'next/image';

export default function GridShowcase() {
  return (
    <section className="relative min-h-screen w-full bg-[#171817] flex flex-col justify-center items-center px-4 py-12">
      {/* Custom Grid Layout */}
      <div className="grid grid-cols-2 grid-rows-5 gap-4 max-w-5xl w-full">
        {/* Image 1 */}
        <div>
          <Image
            alt="img1"
            src="/assets/gallery/1.avif"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="col-start-1 row-start-2">
          <Image
            alt="img2"
            src="/assets/gallery/2.avif"
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 3 */}
        <div className="row-span-2 col-start-1 row-start-3">
          <Image
            alt="img3"
            src="/assets/gallery/3.avif"
            width={800}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 4 */}
        <div className="col-start-1 row-start-5">
          <Image
            alt="img4"
            src="/assets/gallery/4.avif"
            width={800}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 5 */}
        <div className="row-span-2 col-start-2 row-start-1">
          <Image
            alt="img5"
            src="/assets/gallery/5.avif"
            width={800}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 6 */}
        <div className="col-start-2 row-start-3">
          <Image
            alt="img6"
            src="/assets/gallery/6.avif"
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 7 */}
        <div className="row-span-2 col-start-2 row-start-4">
          <Image
            alt="img7"
            src="/assets/gallery/7.avif"
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-10 flex gap-4">
        <button className="bg-[#d1f95c] text-black px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
          Book A Call
        </button>
        <button className="border border-white text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
          Our Services
        </button>
      </div>
    </section>
  );
}
