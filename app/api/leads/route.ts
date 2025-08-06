import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { sendContactEmails } from "@/lib/email";
import { leadSchema } from "@/lib/types/leads";

// Zod validation schema for input

// POST - Create a new lead
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    const newLead = {
      id: uuidv4(),
      ...data,
    };

    await sendContactEmails(data);

    const [lead] = await db.insert(leads).values(newLead).returning();

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        { success: false, errors: error },
        { status: 400 }
      );
    }
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch all leads, ordered by createdAt ascending
export async function GET() {
  try {
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(asc(leads.createdAt));
    return NextResponse.json({ success: true, leads: allLeads });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead by ID passed as query param (?id=...)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    await db.delete(leads).where(eq(leads.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
