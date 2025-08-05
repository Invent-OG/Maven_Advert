'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedHeading from '../AnimatedHeading';
import blogData from '@/lib/blogData';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useRouter } from 'next/navigation';

const ThreeCards = () => {
  const latestThreeBlogs = blogData.slice(0, 3);
  const router = useRouter()

  return (
    <section className="py-12 bg-[#171817]">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedHeading className="text-3xl md:text-6xl font-bold mb-10 text-center" text="Latest Blogs" />

        <div className="grid md:grid-cols-3 gap-8">
          {latestThreeBlogs.map((blog) => (
            <div key={blog.id} className="bg-[#171817] shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-neutral-300 font-semibold mb-2">{blog.title}</h3>
                <p className="text-neutral-600 mb-4">{blog.description.slice(0, 80)}...</p>
                <Link href={`/blogs/${blog.slug}`}>
                  {/* <button className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Read More
                  </button> */}
                  <AnimatedButton
                            onClick={() => router.push('/gallery')} className='shadow-none'       >
                            View Gallery
                          </AnimatedButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Blogs Button */}
        <div className="text-center mt-12">
          {/* <Link href="/blogs">
            <button className="bg-[#DDF694] text-black px-6 py-3 rounded-lg text-lg hover:bg-[#cce781] transition duration-300">
              Explore All Blogs
            </button>
          </Link> */}
          <AnimatedButton onClick={()=>router.push('/blogs')}>Explore All Blogs</AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default ThreeCards;
