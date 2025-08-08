import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

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
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

const fetchBlogById = async (id: string): Promise<{ blog: Blog }> => {
  const response = await fetch(`/api/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

const createBlog = async (data: Omit<Blog, 'id' | 'createdAt'>): Promise<Blog> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create blog');
  return response.json();
};

const updateBlog = async ({ id, data }: { id: string; data: Omit<Blog, 'id' | 'createdAt'> }): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update blog');
  return response.json();
};

const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete blog');
};

// Hooks
export function useBlogs(
  page: number = 1,
  limit: number = 10,
  search: string = "",
  category?: string
) {
  return useQuery({
    queryKey: ['blogs', page, limit, search, category],
    queryFn: () => fetchBlogs(page, limit, search, category),
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id),
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}