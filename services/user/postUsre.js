"use server"

import { db } from "@/config/db/db"
import { usersTable } from "@/config/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function postUser() {
    try {
        const clerkUser = await currentUser()
        if(!clerkUser) return {success: false, error: "User not authenticated"}

        const email = clerkUser.primaryEmailAddress?.emailAddress
        const firstName = clerkUser.firstName
        const lastName = clerkUser.lastName

        if(!email || !firstName || !lastName) {
            return {success: false, error: "Missing required user information"}
        }

        const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)

        if(!existingUser) {
            const [newUser] = await db.insert(usersTable).values({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: null,
                address: null,
            }).returning()

            return {success: true, user: newUser, isNew: true}
        }
        
        return {success: true, user: existingUser, isNew: false}

    } catch(error) {
        console.error("Error in postUser: ", error)
        return {success: false, error: "An error occurred while processing the user data"}
    }
}