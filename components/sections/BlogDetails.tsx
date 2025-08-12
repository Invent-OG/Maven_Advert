// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   slug: string;
//   category: string;
//   createdAt: string; // ISO string
//   content: string;
//   author?: string;
//   readTime?: string;
//   heading?: string;
//   date?: string; // fallback or formatted date string
//   descriptionShort?: string; // for suggestions summary (optional)
// }

// interface BlogDetailsProps {
//   blogId: string;
// }

// const BlogDetails: React.FC<BlogDetailsProps> = ({ blogId }) => {
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [blogData, setBlogData] = useState<Blog[]>([]); // for suggestions & filters
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch the main blog detail
//         const blogRes = await fetch(`/api/blogs/${blogId}`);
//         if (!blogRes.ok) throw new Error("Failed to fetch blog");
//         const blogJson = await blogRes.json();

//         // Fetch all blogs for suggestions and filtering
//         const allBlogsRes = await fetch(`/api/blogs`);
//         if (!allBlogsRes.ok) throw new Error("Failed to fetch blog list");
//         const allBlogsJson = await allBlogsRes.json();

//         if (blogJson.success && blogJson.blog) {
//           setBlog(blogJson.blog);
//         } else {
//           setError("Blog not found");
//         }

//         if (allBlogsJson.success && allBlogsJson.blogs) {
//           setBlogData(allBlogsJson.blogs);
//         } else {
//           setError("Failed to fetch blog list");
//         }
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (blogId) fetchData();
//   }, [blogId]);

//   if (loading)
//     return (
//       <section className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
//         Loading blog...
//       </section>
//     );

//   if (error)
//     return (
//       <section className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">
//         Error: {error}
//       </section>
//     );

//   if (!blog) return null;

//   // Categories & dates for filters
//   const categories = [
//     "All",
//     ...Array.from(new Set(blogData.map((b) => b.category))),
//   ];
//   const uniqueDates = Array.from(
//     new Set(blogData.map((b) => b.createdAt?.slice(0, 10)))
//   ).filter(Boolean);

//   // Filtered suggestions excluding current blog
//   const filteredSuggestions = blogData
//     .filter((b) => b.slug !== blog.slug)
//     .filter(
//       (b) =>
//         (selectedCategory === "All" || b.category === selectedCategory) &&
//         (!selectedDate || b.createdAt?.slice(0, 10) === selectedDate)
//     );

//   return (
//     <div className="bg-[#121418] text-[#161419] min-h-screen flex flex-col items-center justify-center px-4">
//       <div className="grid w-full max-w-screen-xl grid-cols-1 md:grid-cols-3 h-auto md:h-[90vh] max-h-[none] md:max-h-[800px] overflow-hidden p-4 md:p-10 bg-[#e9e6e4] gap-6 md:gap-0">
//         {/* Left Panel: Filters */}
//         <div className="hidden md:flex flex-col border-r border-[#94918f] md:pr-4 overflow-y-auto">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <ul className="mb-6 space-y-2">
//             {categories.map((cat, i) => (
//               <li
//                 key={i}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`cursor-pointer text-sm hover:underline ${
//                   selectedCategory === cat ? "font-bold" : ""
//                 }`}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>

//           <h2 className="text-xl font-semibold mb-2">Filter by Date</h2>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="p-2 text-sm border border-[#94918f] rounded bg-white text-black"
//           />
//           {selectedDate && (
//             <button
//               onClick={() => setSelectedDate("")}
//               className="mt-2 text-xs underline text-blue-500"
//             >
//               Clear Date
//             </button>
//           )}
//         </div>

//         {/* Main Blog Content */}
//         <div className="overflow-y-auto border-b md:border-b-0 md:border-r border-[#94918f] px-0 md:px-4 md:py-10 pb-6 md:pb-0">
//           <div className="min-h-full flex flex-col justify-between mb-10 md:mb-16">
//             <div>
//               <Image
//                 src={blog.imageUrl}
//                 alt={blog.title}
//                 width={500}
//                 height={260}
//                 className="object-cover grayscale w-full h-[260px] rounded mb-4"
//               />
//               <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
//               <div className="text-sm text-gray-600 mb-4">
//                 {new Date(blog.createdAt).toLocaleDateString()}
//               </div>

//               {blog.heading && (
//                 <h2 className="text-xl font-medium my-2">
//                   {blog.heading.split(" ").map((word, i) => (
//                     <span key={i} className={i === 2 ? "italic" : ""}>
//                       {word}{" "}
//                     </span>
//                   ))}
//                 </h2>
//               )}

//               <div className="text-sm flex justify-between font-serif mb-4">
//                 <span>By {blog.author || "Unknown"}</span>
//                 <span>{blog.readTime || "2 Min Read"}</span>
//               </div>

//               <p className="text-sm whitespace-pre-line leading-relaxed">
//                 {blog.content}
//               </p>
//             </div>

//             <Link
//               href="/blogs"
//               className="flex items-center gap-2 text-xl border-t border-[#94918f] pt-4 mt-6"
//             >
//               <span>← Back to Blog</span>
//             </Link>
//           </div>
//         </div>

//         {/* Right Panel: Suggested Blogs */}
//         <div className="flex flex-col px-0 md:px-4 overflow-y-auto">
//           <h3 className="text-xl italic font-serif border-b border-[#94918f] pb-4 mb-6">
//             Suggested Blogs
//           </h3>

//           {filteredSuggestions.length === 0 ? (
//             <p className="text-sm text-gray-600">
//               No blogs match the selected filters.
//             </p>
//           ) : (
//             filteredSuggestions.slice(0, 4).map((item, i) => (
//               <Link
//                 key={i}
//                 href={`/blogs/${item.id}`}
//                 className="mb-6 group block cursor-pointer"
//               >
//                 <Image
//                   src={item.imageUrl}
//                   alt={item.title}
//                   width={400}
//                   height={200}
//                   className="rounded mb-2 object-cover w-full h-[150px]"
//                 />
//                 <h4 className="text-lg font-semibold leading-snug group-hover:underline">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs mt-1 text-gray-700">
//                   {(item.description || "").slice(0, 80)}...
//                 </p>
//               </Link>
//             ))
//           )}

//           <div
//             onClick={() => router.push("/blogs")}
//             className="mt-10 w-full aspect-square rounded-full hover:cursor-pointer bg-[#121418] text-[#e9e6e4] flex flex-col items-center justify-center p-6 text-center"
//           >
//             <div className="text-2xl font-bold">Discover More</div>
//             <div className="text-xs mt-2">
//               Uncover stories that matter most to you.
//             </div>
//             <div className="text-xl italic mt-4">Explore</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  category: string;
  createdAt: string; // ISO string
  content: string;
  author?: string;
  readTime?: string;
  heading?: string;
  date?: string;
  descriptionShort?: string;
}

interface BlogDetailsProps {
  blogId: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blogId }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const blogRes = await fetch(`/api/blogs/${blogId}`);
        if (!blogRes.ok) throw new Error("Failed to fetch blog");
        const blogJson = await blogRes.json();

        const allBlogsRes = await fetch(`/api/blogs`);
        if (!allBlogsRes.ok) throw new Error("Failed to fetch blog list");
        const allBlogsJson = await allBlogsRes.json();

        if (blogJson.success && blogJson.blog) {
          setBlog(blogJson.blog);
        } else {
          setError("Blog not found");
        }

        if (allBlogsJson.success && allBlogsJson.blogs) {
          setBlogData(allBlogsJson.blogs);
        } else {
          setError("Failed to fetch blog list");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (blogId) fetchData();
  }, [blogId]);

  if (loading)
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        Loading blog...
      </section>
    );

  if (error)
    return (
      <section className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">
        Error: {error}
      </section>
    );

  if (!blog) return null;

  const categories = [
    "All",
    ...Array.from(new Set(blogData.map((b) => b.category))),
  ];

  const filteredSuggestions = blogData
    .filter((b) => b.slug !== blog.slug)
    .filter(
      (b) =>
        (selectedCategory === "All" || b.category === selectedCategory) &&
        (!selectedDate || b.createdAt?.slice(0, 10) === selectedDate)
    );

  return (
    <div className="bg-[#121418] text-[#161419] min-h-screen flex flex-col items-center justify-center px-4">
      <div className="grid w-full max-w-screen-xl grid-cols-1 md:grid-cols-3 h-auto md:h-[90vh] max-h-[none] md:max-h-[800px] overflow-hidden p-4 md:p-10 bg-[#e9e6e4] gap-6 md:gap-0">
        {/* Left Sidebar: Redesigned Filters */}
        <div className="hidden md:flex flex-col pr-4 overflow-y-auto border-r border-[#d1cfcd] space-y-6">
          {/* Categories Card */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#121418] text-white font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Date Filter Card */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-lg font-bold">Filter by Date</h2>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate("")}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Reset
                </button>
              )}
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Main Blog Content */}
        <div className="overflow-y-auto border-b md:border-b-0 md:border-r border-[#94918f] px-0 md:px-4 md:py-10 pb-6 md:pb-0">
          <div className="min-h-full flex flex-col justify-between mb-10 md:mb-16">
            <div>
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={500}
                height={260}
                className="object-cover grayscale w-full h-[260px] rounded mb-4"
              />
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
              <div className="text-sm text-gray-600 mb-4">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>

              {blog.heading && (
                <h2 className="text-xl font-medium my-2">
                  {blog.heading.split(" ").map((word, i) => (
                    <span key={i} className={i === 2 ? "italic" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
              )}

              <div className="text-sm flex justify-between font-serif mb-4">
                <span>By {blog.author || "Unknown"}</span>
                <span>{blog.readTime || "2 Min Read"}</span>
              </div>

              <p className="text-sm whitespace-pre-line leading-relaxed">
                {blog.content}
              </p>
            </div>

            <Link
              href="/blogs"
              className="flex items-center gap-2 text-xl border-t border-[#94918f] pt-4 mt-6"
            >
              <span>← Back to Blog</span>
            </Link>
          </div>
        </div>

        {/* Right Panel: Suggested Blogs */}
        <div className="flex flex-col px-0 md:px-4 overflow-y-auto">
          <h3 className="text-xl italic font-serif border-b border-[#94918f] pb-4 mb-6">
            Suggested Blogs
          </h3>

          {filteredSuggestions.length === 0 ? (
            <p className="text-sm text-gray-600">
              No blogs match the selected filters.
            </p>
          ) : (
            filteredSuggestions.slice(0, 4).map((item, i) => (
              <Link
                key={i}
                href={`/blogs/${item.id}`}
                className="mb-6 group block cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="rounded mb-2 object-cover w-full h-[150px]"
                />
                <h4 className="text-lg font-semibold leading-snug group-hover:underline">
                  {item.title}
                </h4>
                <p className="text-xs mt-1 text-gray-700">
                  {(item.description || "").slice(0, 80)}...
                </p>
              </Link>
            ))
          )}

          <div
            onClick={() => router.push("/blogs")}
            className="mt-10 w-full aspect-square rounded-full hover:cursor-pointer bg-[#121418] text-[#e9e6e4] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-2xl font-bold">Discover More</div>
            <div className="text-xs mt-2">
              Uncover stories that matter most to you.
            </div>
            <div className="text-xl italic mt-4">Explore</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
