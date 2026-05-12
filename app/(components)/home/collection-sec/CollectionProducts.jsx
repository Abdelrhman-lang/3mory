"use client"

import { useState } from "react"
import SwiperGrid from "./SwiperGrid"
import SectionTitle from "../../ui/sec-title/SectionTitle"



export default function CollectionProducts({ title, text, products }) {
    const [activeCat, setActiveCat] = useState("Shoes")
    const categories = [...new Set(products.map(p => p.category))]

    const filterdProducts = products.filter(p => p.category === activeCat)
    return (
        <div>

            <SectionTitle title={title} text={text} />
            <div>
                <ul className='flex items-center justify-center gap-8 mb-8'>
                    {categories.map((categoryName) => {
                        return (
                            <li key={categoryName} className={`text-sm cursor-pointer ${activeCat === categoryName ? "text-secondary" : "text-primary"}`} onClick={() => setActiveCat(categoryName)}>
                                {categoryName}
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <SwiperGrid products={filterdProducts} />
                </div>
            </div>
        </div>
    )
}
