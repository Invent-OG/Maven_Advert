import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { db } from "@/lib/db";
import { blogs } from "@/lib/db/schema";
import { eq, count, like, and, sql } from "drizzle-orm";
import { createBlogSchema } from "@/lib/types/blogs"; // using the create schema

// POST - Create a new blog
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate with Zod
    const data = createBlogSchema.parse(body);

    // Insert into Supabase (Drizzle)
    const [blog] = await db.insert(blogs).values(data).returning();

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    console.error("POST /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch blogs with optional pagination, search, and category
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");

    const offset = (page - 1) * limit;

    // Build dynamic WHERE clause
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        sql`(${blogs.title} ILIKE ${`%${search}%`} OR 
              ${blogs.description} ILIKE ${`%${search}%`} OR 
              ${blogs.category} ILIKE ${`%${search}%`})`
      );
    }

    if (category) {
      whereConditions.push(eq(blogs.category, category));
    }

    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Count total matching blogs
    const [{ value: totalCount }] = await db
      .select({ value: count() })
      .from(blogs)
      .where(whereClause ?? sql`1=1`);

    // Fetch paginated results
    const allBlogs = await db
      .select()
      .from(blogs)
      .where(whereClause ?? sql`1=1`)
      .orderBy(blogs.createdAt)
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      blogs: allBlogs,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("GET /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
