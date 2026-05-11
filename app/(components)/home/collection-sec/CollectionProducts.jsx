"use client"

import { useState } from "react"
import SwiperGrid from "./SwiperGrid"
import SectionTitle from "../../ui/sec-title/SectionTitle"

const categores = [
    { id: 1, name: "Shoes", value: "shoes" },
    { id: 2, name: "Handbag", value: "handbag" }
]


export default function CollectionProducts({ title, text, products }) {
    const [activeCat, setActiveCat] = useState("shoes")
    return (
        <div>

            <SectionTitle title={title} text={text} />
            <div>
                <ul className='flex items-center justify-center gap-8 mb-8'>
                    {categores.map((cat) => {
                        return (
                            <li key={cat.id} className={`text-sm cursor-pointer ${activeCat === cat.value ? "text-secondary" : "text-primary"}`} onClick={() => setActiveCat(cat.value)}>
                                {cat.name}
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <SwiperGrid products={products} />
                </div>
            </div>
        </div>
    )
}
