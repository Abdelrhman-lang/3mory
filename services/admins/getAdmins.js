// import { db } from "@/config/db/db"
// import { usersTable } from "@/config/db/schema"
// import { eq } from "drizzle-orm"

// export async function getAdmins(user) {
//     try {
//         if(!user) return {}
//         const result = await db.select().from(usersTable).where(eq(usersTable.role, user.role))

//         return {success: }
//     } catch (error) {
//         console.error("Faild To Get Admins",error)
//         return {success: false, message: "unable to get admins"}
//     }
// }
