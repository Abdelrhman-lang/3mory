"use client"

import { useState } from "react"
import SwiperGrid from "./SwiperGrid"
import SectionTitle from "../sec-title/SectionTitle"

const categores = [
    { id: 1, name: "Shoes", value: "shoes" },
    { id: 2, name: "Handbag", value: "handbag" }
]

const products = [
    { id: 1, img: "/imgs/product1.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 2, img: "/imgs/product2.webp", name: "Marshall Portable  Bluetooth", price: 60.00, oldPrice: 86.00 },
    { id: 3, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 4, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 5, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 6, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 7, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 8, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 9, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 10, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
    { id: 11, img: "/imgs/product3.webp", name: "Apple iPad with Retina", price: 60.00, oldPrice: "" },
]
export default function CollectionProducts({ title, text }) {
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
