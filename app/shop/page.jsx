"use client"
import BreadcrumbBasic from '../(components)/shared/breadcrumb/BreadcrumbBasic'
import ShopFilter from '../(components)/features/filter/ShopFilter'
import ShopHeader from '../(components)/ui/shop-header/ShopHeader'
import ProductsDisplay from '../(components)/features/product/products-display/ProductsDisplay'
import { useState } from 'react'

export default function page() {
    const [gridOption, setGridOption] = useState("grid3")
    const handleSort = (value) => {
        console.log("Sort by:", value)
    }
    return (
        <section>
            <div className='custom-container'>
                <BreadcrumbBasic page='Shop' />
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10'>
                    <aside className=' lg:block lg:col-span-3'>
                        <div className='sticky top-24'>
                            <ShopFilter />
                        </div>
                    </aside>
                    <div className='lg:col-span-9 pb-24'>
                        <ShopHeader onSortChange={handleSort} gridOption={gridOption} setGridOption={setGridOption} />
                        <ProductsDisplay gridOption={gridOption} />
                    </div>
                </div>
            </div>
        </section>
    )
}
