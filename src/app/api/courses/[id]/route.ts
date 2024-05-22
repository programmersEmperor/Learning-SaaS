import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: number}}){
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, params.id)
    });
    return new NextResponse(JSON.stringify(data))
}