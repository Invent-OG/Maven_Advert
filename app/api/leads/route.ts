// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { db } from "@/lib/db";
// import { leads } from "@/lib/db/schema";
// import { eq, count, like, and, sql } from "drizzle-orm";
// import { leadSchema } from "@/lib/types/leads";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = leadSchema.parse(body);

//     const [lead] = await db.insert(leads).values(data).returning();

//     // Send thank you email
//     // await sendLeadThankYouEmail(
//     //   data.whatsappNumber + "@whatsapp.com",
//     //   data.name
//     // );

//     return NextResponse.json({ success: true, lead });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { success: false, errors: error.issues },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const search = searchParams.get("search") || "";
//     const date = searchParams.get("date");
//     const type = searchParams.get("type");

//     const offset = (page - 1) * limit;

//     // Build where conditions
//     let whereConditions = [];

//     if (search) {
//       whereConditions.push(
//         sql`(${leads.name} ILIKE ${`%${search}%`} OR 
//              ${leads.whatsappNumber} ILIKE ${`%${search}%`} OR 
//              ${leads.city} ILIKE ${`%${search}%`})`
//       );
//     }

//     if (date) {
//       const dateObj = new Date(date);
//       const nextDay = new Date(dateObj);
//       nextDay.setDate(nextDay.getDate() + 1);

//       whereConditions.push(
//         sql`${leads.createdAt} >= ${dateObj.toISOString()} AND 
//             ${leads.createdAt} < ${nextDay.toISOString()}`
//       );
//     }

//     if (type) {
//       //@ts-ignore
//       whereConditions.push(eq(leads.type, type as any));
//     }

//     // Combine conditions
//     const whereClause =
//       whereConditions.length > 0 ? and(...whereConditions) : undefined;

//     // Get total count
//     const [{ value: totalCount }] = await db
//       .select({ value: count() })
//       .from(leads)
//       .where(whereClause || sql`1=1`);

//     // Get paginated leads
//     const allLeads = await db
//       .select()
//       .from(leads)
//       .where(whereClause || sql`1=1`)
//       .orderBy(sql`${leads.createdAt} DESC`)
//       .limit(limit)
//       .offset(offset);

//     const totalPages = Math.ceil(totalCount / limit);

//     return NextResponse.json({
//       success: true,
//       leads: allLeads,
//       totalCount,
//       totalPages,
//       currentPage: page,
//     });
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Lead ID is required" },
//         { status: 400 }
//       );
//     }

//     await db.delete(leads).where(eq(leads.id, id));
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    // Extract page and limit from query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch leads from Supabase with pagination
    const { data, error, count } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      leads: data,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (err: any) {
    console.error("Server error:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
