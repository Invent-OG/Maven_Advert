"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedHeading from "../AnimatedHeading";
import AnimatedButton from "@/components/ui/AnimatedButton";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  // slug: string;
  // add other fields if needed
}

const ThreeCards = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        setLoading(true);
        setError(null);

        // Fetch only first page, limit 3 blogs
        const res = await fetch("/api/blogs?page=1&limit=3");
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          setError("Failed to load blogs");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-[#171817]">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          Loading latest blogs...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-[#171817]">
        <div className="max-w-6xl mx-auto px-4 text-center text-red-500">
          Error: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#171817]">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedHeading
          className="text-3xl md:text-6xl font-bold mb-10 text-center"
          text="Latest Blogs"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#171817] shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-neutral-300 font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {blog.description.length > 80
                    ? blog.description.slice(0, 80) + "..."
                    : blog.description}
                </p>
                <AnimatedButton
                  onClick={() => router.push(`/blogs/${blog.id}`)}
                  className="shadow-none"
                >
                  Read More
                </AnimatedButton>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Blogs Button */}
        <div className="text-center mt-12">
          <AnimatedButton onClick={() => router.push("/blogs")}>
            Explore All Blogs
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default ThreeCards;
