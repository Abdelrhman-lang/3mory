import React from 'react'
import PageClient from './PageClient'
import { db } from '@/config/db/db'
import { colorsTable, productsTable, sizesTable } from '@/config/db/schema'
import { eq } from 'drizzle-orm'
import { getProductsByCategory } from '@/services/products/getProductsByCategory'


export default async function page({ params }) {
    const { id } = await params

    const productData = await db.select().from(productsTable).leftJoin(sizesTable, eq(productsTable.id, sizesTable.productId)).leftJoin(colorsTable, eq(colorsTable.sizeId, sizesTable.id)).where(eq(productsTable.id, id))

    const product = {
        ...productData[0].products, sizes: [...new Set(productData.map(d => d.sizes).filter(Boolean))], colors: [...new Set(productData.map(d => d.colors).filter(Boolean))]
    }
    const uniqueProduct = {
        ...product,
        sizes: [...new Map(product.sizes.map(s => [s.sizeValue, s])).values()],
        colors: [...new Map(product.colors.map(c => [c.colorName, c])).values()]
    }

    // Products By Categort
    const productsByCategory = await getProductsByCategory(uniqueProduct.category)
    return (
        <PageClient uniqueProduct={uniqueProduct} product={product} products={productsByCategory} />
    )
}
