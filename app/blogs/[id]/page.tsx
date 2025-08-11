import BlogDetails from "@/components/sections/BlogDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params; // ✅ Await params before using
  return <BlogDetails blogId={id} />;
}
