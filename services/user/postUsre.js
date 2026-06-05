"use server";
import { db } from "@/config/db/db";
import { usersTable } from "@/config/db/schema";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// 🌟 حدد إيميلك الشخصي هنا (أو لستة الإيميلات اللي عاوزها تبقا أدمن)
const ADMIN_EMAILS = [
  "abdokhaled766@gmail.com",
  "abdelrhmankhaled080@gmail.com",
]; // 👈 حط إيميلك الحقيقي هنا

export async function postUser() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { success: false, error: "User not authenticated" };

    const email = clerkUser.primaryEmailAddress?.emailAddress;
    const firstName = clerkUser.firstName;
    const lastName = clerkUser.lastName;
    const role = clerkUser.publicMetadata.role;
    if (!email || !firstName || !lastName) {
      return { success: false, error: "Missing required user information" };
    }

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    // 1️⃣ حالة: مستخدم جديد تماماً في السيستم
    if (!existingUser) {
      const [newUser] = await db
        .insert(usersTable)
        .values({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: null,
          address: null,
          role: role,
        })
        .returning();

      return { success: true, user: newUser, isNew: true };
    }

    return { success: true, user: existingUser, isNew: false };
  } catch (error) {
    console.error("Error in postUser: ", error);
    return {
      success: false,
      error: "An error occurred while processing the user data",
    };
  }
}
