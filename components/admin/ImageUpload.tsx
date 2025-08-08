import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: string;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket,
  folder = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      try {
        // Create a sanitized file name
        const fileExt = file.name.split(".").pop();
        const fileName = `${
          folder ? `${folder}/` : ""
        }${Date.now()}.${fileExt}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        setPreview(urlData.publicUrl);
        onChange(urlData.publicUrl);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={600}
            height={192}
            className="w-full h-48 object-cover"
            style={{ objectFit: "cover" }}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20"
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here, or click to select"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
