import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

// Types
export interface Testimonial {
  _id?: string;
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
  youtubeUrl?: string;
}

// API Functions
const fetchTestimonials = async (): Promise<{
  testimonials: Testimonial[];
}> => {
  const response = await fetch("/api/testimonials");
  if (!response.ok) throw new Error("Failed to fetch testimonials");
  return response.json();
};

const createTestimonial = async (
  data: Omit<Testimonial, "id">
): Promise<Testimonial> => {
  const response = await fetch("/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create testimonial");
  return response.json();
};

const updateTestimonial = async (params: {
  id: string;
  data: Omit<Testimonial, "id">;
}): Promise<Testimonial> => {
  const response = await fetch(`/api/testimonials/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params.data),
  });
  if (!response.ok) throw new Error("Failed to update testimonial");
  return response.json();
};

const deleteTestimonial = async (id: string): Promise<void> => {
  const response = await fetch(`/api/testimonials?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete testimonial");
};

// Hooks
export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
}

export function useCreateTestimonial(): UseMutationResult<
  Testimonial,
  Error,
  Omit<Testimonial, "id">,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation<Testimonial, Error, Omit<Testimonial, "id">>({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useUpdateTestimonial(): UseMutationResult<
  Testimonial,
  Error,
  { id: string; data: Omit<Testimonial, "id"> },
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation<
    Testimonial,
    Error,
    { id: string; data: Omit<Testimonial, "id"> }
  >({
    mutationFn: updateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}
