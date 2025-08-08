import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { testimonialSchema } from "@/lib/types/testimonials";

// GET all testimonials
export async function GET() {
  try {
    const allTestimonials = await db.select().from(testimonials);
    return NextResponse.json({ success: true, testimonials: allTestimonials });
  } catch (error) {
    console.error("[GET Testimonials]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST a new testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = testimonialSchema.parse(body);

    const [testimonial] = await db
      .insert(testimonials)
      .values({
        name: data.name,
        role: data.role,
        content: data.content,
        imageUrl: data.imageUrl!,
        youtubeUrl: data.youtubeUrl || null,
      })
      .returning();

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("[POST Testimonials]", error);
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

// DELETE testimonial by ID (via query param ?id=)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE Testimonials]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
