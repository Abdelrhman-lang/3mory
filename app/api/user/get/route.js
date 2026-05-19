import { db } from "@/config/db/db";
import { usersTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)

        const userEmail = searchParams.get("userEmail")

        if (!userEmail) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const users = await db.select().from(usersTable).where(eq(usersTable.email, userEmail))

        if (users.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json(users[0])
    } catch (err) {
        console.error("Error getting user :", err);
        return NextResponse.json(
            { error: "Error getting user" },
            { status: 500 }
        );
    }
}