import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { testimonialSchema } from "@/lib/types/testimonials";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Testimonial ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const data = testimonialSchema.parse(body);

    const result = await db
      .update(testimonials)
      .set({
        name: data.name,
        role: data.role,
        content: data.content,
        imageUrl: data.imageUrl!,
        youtubeUrl: data.youtubeUrl || null,
      })
      .where(eq(testimonials.id, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, testimonial: result[0] });
  } catch (error) {
    console.error("[PUT Testimonials]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
