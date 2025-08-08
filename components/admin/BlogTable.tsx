"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2, Calendar, Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import BlogForm from "./BlogForm";
import { useBlogs, useDeleteBlog } from "@/lib/queries/blogs";
import { toast } from "sonner";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase/client";
import { getStoragePath } from "@/lib/utils";

interface BlogTableProps {
  searchTerm: string;
}

export default function BlogTable({ searchTerm }: BlogTableProps) {
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data, isLoading } = useBlogs(
    currentPage,
    itemsPerPage,
    searchTerm,
    selectedCategory !== "all" ? selectedCategory : undefined
  );

  const deleteBlogMutation = useDeleteBlog();

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(blogs.map((blog) => blog.id));
    }
  };

  const handleSelect = (blogId: string) => {
    if (selectedBlogs.includes(blogId)) {
      setSelectedBlogs(selectedBlogs.filter((id) => id !== blogId));
    } else {
      setSelectedBlogs([...selectedBlogs, blogId]);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      const blog = blogs.find((b) => b.id === blogId);
      if (blog?.imageUrl) {
        const path = getStoragePath(blog.imageUrl);
        if (path) {
          console.log("Removing from Supabase:", path);
          const { data, error } = await supabase.storage
            .from("blog-images")
            .remove([path]);
          if (error) console.error("Supabase delete error:", error);
        }
      }
      await deleteBlogMutation.mutateAsync(blogId);
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleDeleteSelected = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedBlogs.length} blog post(s)?`
      )
    ) {
      try {
        for (const id of selectedBlogs) {
          const blog = blogs.find((b) => b.id === id);
          if (blog?.imageUrl) {
            const path = getStoragePath(blog.imageUrl);
            if (path) {
              await supabase.storage.from("blog-images").remove([path]);
            }
          }
          await deleteBlogMutation.mutateAsync(id);
        }
        toast.success("Selected blogs deleted successfully");
        setSelectedBlogs([]);
      } catch (error) {
        toast.error("Failed to delete some blogs");
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedBlogs([]);
  };

  const handleDateReset = () => {
    setSelectedDate(null);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  if (editingBlog) {
    return (
      <BlogForm
        onClose={() => setEditingBlog(null)}
        initialData={editingBlog}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: itemsPerPage }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse flex items-center space-x-4 p-4 border rounded"
          >
            <div className="h-16 w-24 bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Get unique categories for filter
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <div>
      {selectedBlogs.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedBlogs.length})
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4 items-center">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-2 flex justify-between items-center border-b">
                <span className="text-sm font-medium">Select date</span>
                {selectedDate && (
                  <Button variant="ghost" size="sm" onClick={handleDateReset}>
                    Reset
                  </Button>
                )}
              </div>
              <CalendarComponent
                mode="single"
                required={true}
                selected={selectedDate!}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedBlogs.length === blogs.length && blogs.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedBlogs.includes(blog.id)}
                      onCheckedChange={() => handleSelect(blog.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-16 w-24">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingBlog(blog)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmation
                      onDelete={() => handleDelete(blog.id)}
                      title="Delete Blog Post"
                      description="Are you sure you want to delete this blog post? This action cannot be undone."
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              {itemsPerPage} / page
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
