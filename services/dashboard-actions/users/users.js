"use server";
import { db } from "@/config/db/db";
import { usersTable } from "@/config/db/schema";

export async function getUsers() {
  try {
    const users = await db.select().from(usersTable);
    return { success: true, users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}
