import React from 'react'

export default function Size({ product, selectedSize, setSelectedSize }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="uppercase font-medium">size</span>
            <ul className="flex items-center gap-5">
                {product.sizes.map((size) => {
                    return (
                        <li onClick={() => setSelectedSize(size)} key={size.id} className={`w-[40px] h-[40px] rounded-full cursor-pointer ${selectedSize?.id === size.id ? "bg-secondary text-white" : "bg-[#f1f1f1] text-primary"} text-sm flex items-center justify-center`}>
                            {size.sizeValue}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
