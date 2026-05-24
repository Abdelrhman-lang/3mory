"use server"

import { db } from "@/config/db/db"
import { usersTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function updateUser(userEmail, phoneNumber, address) {
    try {
        if(!userEmail) return {success: false, error: "User email is required"}

        const updatedUser = await db.update(usersTable).set({
            address: address,
            phoneNumber: phoneNumber,
        }).where(eq(usersTable.email, userEmail)).returning()

        if(updatedUser && updatedUser.length > 0) {
            return {success: true, user: updatedUser[0]}
        } else {
            return {success: false, error: "User not found or update failed"}
        }

    } catch (error) {
        return {success: false, error: "Failed to update user"}
    }
}