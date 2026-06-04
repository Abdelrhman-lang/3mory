// import { db } from "@/config/db/db";
// import { orderItemsTable } from "@/config/db/schema";
// import { eq } from "drizzle-orm";

// export async function getOrderItems(orderId) {
//     try {
//          if(!orderId) return {success: false, message: "order id is requierd"}

//          const result = await db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, Number(orderId))).retun
//     } catch (error) {
//         console.error("Faild To Get Order Items", error);
//         return {success: false, message: "unable to get this order items"}
//     }
// }
