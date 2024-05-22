import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const {userId} = await auth();
    console.log('user: ' + JSON.stringify(userId))
    if(!userId){
        return new NextResponse(JSON.stringify({
            message: "unauthorized"
        }));
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    console.log("data "+ JSON.stringify(userId))
    return new NextResponse(JSON.stringify(data))
}