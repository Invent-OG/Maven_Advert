// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// // Types
// export interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   content: string;
//   imageUrl: string;
//   category: string;
//   createdAt: string;
// }

// // API Functions
// const fetchBlogs = async (
//   page: number = 1,
//   limit: number = 10,
//   search: string = "",
//   category?: string
// ): Promise<{ blogs: Blog[]; totalCount: number; totalPages: number }> => {
//   const params = new URLSearchParams({
//     page: page.toString(),
//     limit: limit.toString(),
//   });

//   if (search) params.append("search", search);
//   if (category) params.append("category", category);

//   const response = await fetch(`/api/blogs?${params.toString()}`);
//   if (!response.ok) throw new Error('Failed to fetch blogs');
//   return response.json();
// };

// const fetchBlogById = async (id: string): Promise<{ blog: Blog }> => {
//   const response = await fetch(`/api/blogs/${id}`);
//   if (!response.ok) throw new Error('Failed to fetch blog');
//   return response.json();
// };

// const createBlog = async (
//   data: Omit<Blog, "id" | "createdAt">
// ): Promise<Blog> => {
//   const response = await fetch("/api/blogs", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create blog");
//   const json = await response.json();
//   if (!json.success) throw new Error("Failed to create blog");
//   return json.blog;
// };

// const updateBlog = async ({
//   id,
//   data,
// }: {
//   id: string;
//   data: Omit<Blog, "id" | "createdAt">;
// }): Promise<Blog> => {
//   const response = await fetch(`/api/blogs/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to update blog");
//   const json = await response.json();
//   if (!json.success) throw new Error("Failed to update blog");
//   return json.blog;
// };

// const deleteBlog = async (id: string): Promise<void> => {
//   const response = await fetch(`/api/blogs/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) throw new Error('Failed to delete blog');
// };

// // Hooks
// export function useBlogs(
//   page: number = 1,
//   limit: number = 10,
//   search: string = "",
//   category?: string
// ) {
//   return useQuery({
//     queryKey: ['blogs', page, limit, search, category],
//     queryFn: () => fetchBlogs(page, limit, search, category),
//   });
// }

// export function useBlog(id: string) {
//   return useQuery({
//     queryKey: ['blog', id],
//     queryFn: () => fetchBlogById(id),
//   });
// }

// export function useCreateBlog() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createBlog,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['blogs'] });
//     },
//   });
// }

// export function useUpdateBlog() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateBlog,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['blogs'] });
//     },
//   });
// }

// export function useDeleteBlog() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteBlog,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['blogs'] });
//     },
//   });
// }
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Import your zod schemas
import { blogSchema, createBlogSchema } from "@/lib/types/blogs";

// Infer types from your zod schemas
export type Blog = z.infer<typeof blogSchema>;
export type BlogCreateInput = z.infer<typeof createBlogSchema>;

// API Functions
const fetchBlogs = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  category?: string
): Promise<{ blogs: Blog[]; totalCount: number; totalPages: number }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const response = await fetch(`/api/blogs?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

const fetchBlogById = async (id: string): Promise<{ blog: Blog }> => {
  const response = await fetch(`/api/blogs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch blog");

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error || "Failed to fetch blog");
  }

  return json; // contains { success: true, blog }
};

const createBlog = async (data: BlogCreateInput): Promise<Blog> => {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create blog");
  const json = await response.json();
  if (!json.success) throw new Error("Failed to create blog");
  return json.blog;
};

const updateBlog = async ({
  id,
  data,
}: {
  id: string;
  data: BlogCreateInput;
}): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update blog");
  const json = await response.json();
  if (!json.success) throw new Error("Failed to update blog");
  return json.blog;
};

const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete blog");
};

// Hooks
export function useBlogs(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  category?: string
) {
  return useQuery<{
    blogs: Blog[];
    totalCount: number;
    totalPages: number;
  }>({
    queryKey: ["blogs", page, limit, search, category],
    queryFn: () => fetchBlogs(page, limit, search, category),
  });
}

export function useBlog(id: string) {
  return useQuery<{
    blog: Blog;
  }>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, BlogCreateInput>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<Blog, Error, { id: string; data: BlogCreateInput }>({
    mutationFn: updateBlog,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteBlog,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
  });
}
