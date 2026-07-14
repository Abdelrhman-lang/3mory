"use server";
import { clerkClient } from "@clerk/nextjs/server";

export async function addAdmin(email) {
  try {
    if (!email) return { success: false, message: "Email is required" };

    const client = await clerkClient();

    const res = await client.users.getUserList({
      emailAddress: [email],
      limit: 1,
    });

    if (res.data.length === 0) {
      return {
        success: false,
        message:
          "This email is not registered in the store yet. They must sign up first.",
      };
    }

    const targetAdmin = res.data[0];
    await client.users.updateUserMetadata(targetAdmin.id, {
      publicMetadata: {
        role: "admin",
      },
    });

    return {
      success: true,
      message: `${targetAdmin.firstName || "Admin"} is now an Admin successfully!`,
    };
  } catch (error) {
    console.error("Error adding admin:", error);
    return { success: false, message: "Failed to add admin." };
  }
}
