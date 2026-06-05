"use server";
import { db } from "@/config/db/db";
import { usersTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function getAdmins() {
  try {
    const admins = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.role, "admin"));

    return {
      success: true,
      admins,
    };
  } catch (error) {
    console.error("Faild to Fetch Admins", error);
    return { success: false, error: "unable to fetch admins" };
  }
}
