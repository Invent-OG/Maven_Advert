// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   useCreateTestimonial,
//   useUpdateTestimonial,
// } from "@/lib/queries/testimonials";
// import { toast } from "sonner";
// import { supabase } from "@/lib/supabase/client";
// import { testimonialSchema } from "@/lib/types/testimonials";

// type TestimonialFormData = z.infer<typeof testimonialSchema>;

// interface TestimonialFormProps {
//   onClose: () => void;
//   initialData?: TestimonialFormData & { id?: string; _id?: string };
//   onSuccess?: () => void;
// }

// export default function TestimonialForm({
//   onClose,
//   initialData,
//   onSuccess,
// }: TestimonialFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [fileToUpload, setFileToUpload] = useState<File | null>(null);

//   const createTestimonialMutation = useCreateTestimonial();
//   const updateTestimonialMutation = useUpdateTestimonial();

//   const form = useForm<TestimonialFormData>({
//     resolver: zodResolver(testimonialSchema),
//     defaultValues: {
//       name: initialData?.name ?? "",
//       role: initialData?.role ?? "",
//       content: initialData?.content ?? "",
//       youtubeUrl: initialData?.youtubeUrl ?? "",
//       imageUrl: initialData?.imageUrl ?? "",
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null;
//     setFileToUpload(file);
//   };

//   const onSubmit = async (data: TestimonialFormData) => {
//     setIsSubmitting(true);

//     try {
//       let imageUrl = data.imageUrl;

//       // Upload image if selected
//       if (fileToUpload) {
//         setUploading(true);
//         const fileExt = fileToUpload.name.split(".").pop();
//         const fileName = `${Date.now()}.${fileExt}`;
//         const filePath = `testimonials/${fileName}`;

//         const { error: uploadError } = await supabase.storage
//           .from("images")
//           .upload(filePath, fileToUpload);

//         if (uploadError) {
//           toast.error("Image upload failed");
//           throw uploadError;
//         }

//         const { data: publicUrlData } = supabase.storage
//           .from("images")
//           .getPublicUrl(filePath);

//         if (!publicUrlData?.publicUrl) {
//           toast.error("Failed to get public image URL");
//           throw new Error("No public URL found");
//         }

//         imageUrl = publicUrlData.publicUrl;
//         setUploading(false);
//       }

//       // Build payload without `id`
//       const { id, ...rest } = initialData || {};
//       const payload: Omit<TestimonialFormData, "id"> = {
//         ...data,
//         imageUrl,
//         // ...(rest._id ? { _id: rest._id } : {}),
//       };

//       const docId = initialData?.id;

//       if (docId) {
//         // Update
//         await updateTestimonialMutation.mutateAsync({
//           id: docId,
//           data: payload,
//         });
//         toast.success("Testimonial updated successfully");
//       } else {
//         // Create
//         await createTestimonialMutation.mutateAsync(payload);
//         toast.success("Testimonial created successfully");
//       }

//       form.reset();
//       setFileToUpload(null);
//       onSuccess ? onSuccess() : onClose();
//     } catch (error) {
//       toast.error(
//         initialData
//           ? "Failed to update testimonial"
//           : "Failed to create testimonial"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-card rounded-lg p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">
//           {initialData ? "Edit Testimonial" : "Add New Testimonial"}
//         </h2>
//         <Button variant="ghost" onClick={onClose}>
//           Cancel
//         </Button>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Role */}
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Role</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter role" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Content */}
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Content</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     {...field}
//                     placeholder="Enter testimonial content"
//                     className="min-h-[100px]"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Image Upload */}
//           <FormItem>
//             <FormLabel>Upload Image</FormLabel>
//             <FormControl>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 disabled={uploading || isSubmitting}
//               />
//             </FormControl>
//             {uploading && <p className="text-sm text-muted">Uploading...</p>}
//             {fileToUpload && (
//               <img
//                 src={URL.createObjectURL(fileToUpload)}
//                 alt="Preview"
//                 className="h-20 w-20 object-cover rounded-md mt-2"
//               />
//             )}
//             {!fileToUpload && form.watch("imageUrl") && (
//               <img
//                 src={form.watch("imageUrl")}
//                 alt="Uploaded"
//                 className="h-20 w-20 object-cover rounded-md mt-2"
//               />
//             )}
//             <FormMessage />
//           </FormItem>

//           {/* Hidden input for imageUrl */}
//           <input type="hidden" {...form.register("imageUrl")} />

//           {/* YouTube URL */}
//           <FormField
//             control={form.control}
//             name="youtubeUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>YouTube URL (Optional)</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Enter YouTube video URL" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Submit Button */}
//           <div className="flex justify-end gap-4">
//             <Button
//               type="submit"
//               disabled={
//                 isSubmitting ||
//                 uploading ||
//                 createTestimonialMutation.isPending ||
//                 updateTestimonialMutation.isPending
//               }
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : initialData
//                   ? "Update Testimonial"
//                   : "Add Testimonial"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateTestimonial,
  useUpdateTestimonial,
} from "@/lib/queries/testimonials";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  youtubeUrl: z
    .string()
    .url("Please enter a valid YouTube URL")
    .optional()
    .or(z.literal("")),
  imageUrl: z.string().min(1, "Profile image is required"),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  onClose: () => void;
  initialData?: TestimonialFormData & { id: string };
}

export default function TestimonialForm({
  onClose,
  initialData,
}: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTestimonialMutation = useCreateTestimonial();
  const updateTestimonialMutation = useUpdateTestimonial();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      content: "",
      youtubeUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      if (initialData?.id) {
        await updateTestimonialMutation.mutateAsync({
          id: initialData.id,
          data,
        });
        toast.success("Testimonial updated successfully");
      } else {
        await createTestimonialMutation.mutateAsync(data);
        toast.success("Testimonial created successfully");
      }

      form.reset();
      onClose();
    } catch (error) {
      toast.error(
        initialData
          ? "Failed to update testimonial"
          : "Failed to create testimonial"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter role" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter testimonial content"
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    bucket="testimonials"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter YouTube video URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                createTestimonialMutation.isPending ||
                updateTestimonialMutation.isPending
              }
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                  ? "Update Testimonial"
                  : "Add Testimonial"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
