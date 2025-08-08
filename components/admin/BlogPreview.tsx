import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPreviewProps {
  title: string;
  content: string;
  imageUrl: string;
}

export default function BlogPreview({
  title,
  content,
  imageUrl,
}: BlogPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="100vw"
          priority
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
}
