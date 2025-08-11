// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { blogs } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import { z } from "zod";
// import { blogSchema } from "@/lib/types/blogs";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);

//   const pathname = new URL(request.url).pathname;
//   const segments = pathname.split("/");
//   const id = segments[segments.length - 1];

//   try {
//     const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
//     if (!blog) {
//       return NextResponse.json(
//         { success: false, error: "Blog not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json({ success: true, blog });
//   } catch {
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: NextRequest) {
//   const pathname = new URL(request.url).pathname;
//   const segments = pathname.split("/");
//   const id = segments[segments.length - 1];

//   try {
//     const body = await request.json();
//     const data = blogSchema.parse(body);

//     const [existing] = await db.select().from(blogs).where(eq(blogs.id, id));
//     if (!existing) {
//       return NextResponse.json(
//         { success: false, error: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     const [updatedBlog] = await db
//       .update(blogs)
//       .set(data)
//       .where(eq(blogs.id, id))
//       .returning();

//     return NextResponse.json({ success: true, blog: updatedBlog });
//   } catch (error) {
//     if (error) {
//       return NextResponse.json(
//         { success: false, errors: error },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   const pathname = new URL(request.url).pathname;
//   const segments = pathname.split("/");
//   const id = segments[segments.length - 1];

//   try {
//     const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
//     if (!blog) {
//       return NextResponse.json(
//         { success: false, error: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     await db.delete(blogs).where(eq(blogs.id, id));
//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z, ZodError } from "zod";
import { createBlogSchema } from "@/lib/types/blogs";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const segments = pathname.split("/");
  const id = decodeURIComponent(segments[segments.length - 1]);

  try {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("GET /blogs/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const segments = pathname.split("/");
  const id = decodeURIComponent(segments[segments.length - 1]);

  try {
    const body = await request.json();
    const data = createBlogSchema.parse(body);

    const [existing] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set(data)
      .where(eq(blogs.id, id))
      .returning();

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("PUT /blogs/[id] error:", error);
    if (error instanceof ZodError) {
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

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const segments = pathname.split("/");
  const id = decodeURIComponent(segments[segments.length - 1]);

  try {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    await db.delete(blogs).where(eq(blogs.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /blogs/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
