import React from 'react'
import products from "../../../../../products.json"
import ProductCard from '../product-card/ProductCard'
export default function ProductsDisplay({ gridOption }) {
    const gridConfigs = {
        grid3: "md:grid-cols-3",
        grid4: "md:grid-cols-4",
        grid5: "md:grid-cols-5"
    }
    const currentGrid = gridConfigs[gridOption]
    return (
        <div className={`grid grid-cols-1 ${currentGrid} gap-5 mt-10 transition-all duration-300`}>
            {products.map((product) => {
                return (
                    <ProductCard product={product} key={product.id} />
                )
            })}
        </div>
    )
}
