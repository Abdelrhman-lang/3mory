"use server";
import { db } from "@/config/db/db";
import { usersTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userEmail) {
  try {
    if (!userEmail) return null;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.error("Error in getUser function:", err);
    return null;
  }
}
