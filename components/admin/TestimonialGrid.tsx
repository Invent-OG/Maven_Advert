// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Edit2, Plus, Trash2, Youtube } from "lucide-react";
// import {
//   useTestimonials,
//   useDeleteTestimonial,
// } from "@/lib/queries/testimonials";
// import { Pagination } from "@/components/ui/pagination";
// import TestimonialForm from "./TestimonialForm";
// import { DeleteConfirmation } from "./DeleteConfirmation";
// import { toast } from "sonner";

// interface TestimonialGridProps {
//   searchTerm: string;
// }

// const ITEMS_PER_PAGE = 9;

// export default function TestimonialGrid({ searchTerm }: TestimonialGridProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingTestimonial, setEditingTestimonial] = useState<any | null>(
//     null
//   );
//   const [formVisible, setFormVisible] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const { data, isLoading } = useTestimonials();
//   const deleteTestimonialMutation = useDeleteTestimonial();

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteTestimonialMutation.mutateAsync(id);
//       toast.success("Testimonial deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete testimonial");
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(
//         selectedIds.map((id) => deleteTestimonialMutation.mutateAsync(id))
//       );
//       toast.success("Selected testimonials deleted successfully");
//       setSelectedIds([]);
//       setSelectAll(false);
//     } catch (error) {
//       toast.error("Failed to delete selected testimonials");
//     }
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(paginatedTestimonials.map((t) => t.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const toggleSelect = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const openAddForm = () => {
//     setEditingTestimonial(null);
//     setFormVisible(true);
//   };

//   const openEditForm = (testimonial: any) => {
//     setEditingTestimonial(testimonial);
//     setFormVisible(true);
//   };

//   const closeForm = () => {
//     setEditingTestimonial(null);
//     setFormVisible(false);
//   };

//   const handleFormSuccess = () => {
//     setCurrentPage(1);
//     closeForm();
//   };

//   if (isLoading) {
//     return <div className="text-center py-8">Loading testimonials...</div>;
//   }

//   const testimonials = data?.testimonials || [];

//   const filteredTestimonials = testimonials.filter(
//     (testimonial) =>
//       testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
//   const paginatedTestimonials = filteredTestimonials.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   console.log(testimonials, "Testimonials Data");

//   return (
//     <div>
//       {/* Top Action Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
//         <Button onClick={openAddForm} className="flex items-center gap-2">
//           <Plus className="w-4 h-4" />
//           Add Testimonial
//         </Button>

//         {selectedIds.length > 0 && (
//           <Button
//             variant="destructive"
//             onClick={handleBulkDelete}
//             className="flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             Delete Selected ({selectedIds.length})
//           </Button>
//         )}
//       </div>

//       {/* Select All Toggle */}
//       {paginatedTestimonials.length > 0 && (
//         <div className="flex items-center gap-2 mb-2">
//           <input
//             type="checkbox"
//             checked={selectAll}
//             onChange={toggleSelectAll}
//             className="w-4 h-4"
//           />
//           <label className="text-sm">Select All on This Page</label>
//         </div>
//       )}

//       {/* Testimonials Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedTestimonials.map((testimonial) => (
//           <Card
//             key={testimonial.id}
//             className="relative flex flex-col h-full max-h-[450px]"
//           >
//             <div className="absolute top-4 left-4">
//               <input
//                 type="checkbox"
//                 checked={selectedIds.includes(testimonial.id)}
//                 onChange={() => toggleSelect(testimonial.id)}
//                 className="w-4 h-4"
//               />
//             </div>

//             <div className="p-6 flex flex-col justify-between h-full">
//               <div>
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="relative h-16 w-16 rounded-full overflow-hidden">
//                     {testimonial.imageUrl ? (
//                       <Image
//                         src={testimonial.imageUrl}
//                         alt={testimonial.name}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <Image
//                         src="/default-avatar.png"
//                         alt="Default"
//                         fill
//                         className="object-cover"
//                       />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{testimonial.name}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground mb-4 line-clamp-5">
//                   {testimonial.content}
//                 </p>
//               </div>
//               <div className="flex justify-between items-center mt-auto">
//                 <div>
//                   {testimonial.youtubeUrl && (
//                     <a
//                       href={testimonial.youtubeUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       <Youtube className="h-5 w-5" />
//                     </a>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => openEditForm(testimonial)}
//                   >
//                     <Edit2 className="h-4 w-4" />
//                   </Button>
//                   <DeleteConfirmation
//                     onDelete={() => handleDelete(testimonial.id)}
//                     title="Delete Testimonial"
//                     description="Are you sure you want to delete this testimonial? This action cannot be undone."
//                   />
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-8">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}

//       {/* Testimonial Form Modal */}
//       {formVisible && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//           <div className="bg-background rounded-lg w-full max-w-xl mx-auto shadow-lg p-6">
//             <TestimonialForm
//               onClose={closeForm}
//               initialData={editingTestimonial || undefined}
//               onSuccess={handleFormSuccess}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Youtube } from "lucide-react";
import {
  useTestimonials,
  useDeleteTestimonial,
} from "@/lib/queries/testimonials";
import { Pagination } from "@/components/ui/pagination";
import TestimonialForm from "./TestimonialForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { getStoragePath } from "@/lib/utils";

interface TestimonialGridProps {
  searchTerm: string;
}

const ITEMS_PER_PAGE = 10;

export default function TestimonialGrid({ searchTerm }: TestimonialGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(
    null
  );

  const { data, isLoading } = useTestimonials();
  const deleteTestimonialMutation = useDeleteTestimonial();

  console.log(
    "Testimonials data:",
    data?.testimonials.map((t) => t.imageUrl)
  );

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      if (imageUrl) {
        const path = getStoragePath(imageUrl);
        if (path) {
          console.log("Removing from Supabase:", path);
          const { data, error } = await supabase.storage
            .from("testimonials")
            .remove([path]);
          if (error) console.error("Supabase delete error:", error);
        }
      }

      await deleteTestimonialMutation.mutateAsync(id);
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  const testimonials = data?.testimonials || [];

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (editingTestimonial) {
    return (
      <TestimonialForm
        onClose={() => setEditingTestimonial(null)}
        initialData={editingTestimonial}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="p-6 flex flex-col h-full justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={testimonial.imageUrl!}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {testimonial.content}
            </p>
            <div className="flex justify-between items-center">
              <div>
                {testimonial.youtubeUrl && (
                  <a
                    href={testimonial.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingTestimonial(testimonial)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <DeleteConfirmation
                  onDelete={() =>
                    handleDelete(testimonial.id, testimonial.imageUrl!)
                  }
                  title="Delete Testimonial"
                  description="Are you sure you want to delete this testimonial? This action cannot be undone."
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
