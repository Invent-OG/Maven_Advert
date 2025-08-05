'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import blogData from '@/lib/blogData';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogList = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: index * 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-6xl text-neutral-600 font-bold text-center mb-14">Latest Maven</h2>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {blogData.map((blog, index) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <div
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-[#0f0f0f] rounded-xl border border-neutral-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 text-white space-y-3">
                <h3 className="text-xl font-semibold group-hover:text-[#DDF694] transition">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3">
                  {blog.description}
                </p>

                <div className="flex items-center justify-between text-xs mt-4">
                  <span className="bg-[#DDF694] text-black px-3 py-1 rounded-full font-medium">
                    {blog.category || 'General'}
                  </span>
                  <span className="text-gray-500">{blog.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
