import { db } from "@/config/db/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await db.query.productsTable.findMany({
            with: {
                sizes: {
                    with: {
                        colors: true
                    }
                }
            }
        })
        return NextResponse.json(products)
    } catch (err) {
        console.error(err.message || "Error When Fetching Products");
        return NextResponse.json(
            { error: err.message || "Failed to Fetch Products" },
            { status: 500 }
        );
    }
}