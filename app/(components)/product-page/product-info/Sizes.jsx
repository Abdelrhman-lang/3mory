import React from 'react'

export default function Sizes({ uniqueProduct, selectedSize, setSelectedSize, setSelectedSizeId }) {
    return (
        <div>
            <div className="flex items-center gap-10">
                <p className="capitalize text-primary font-bold text-xl">size:</p>
                <ul className="flex flex-wrap items-center gap-5">
                    {uniqueProduct.sizes.map((size) => {
                        return (
                            <li key={size.id}>
                                <button onClick={() => {
                                    setSelectedSize(size.sizeValue)
                                    setSelectedSizeId(size.id)
                                }} className={`bg-[#f1f1f1] px-3 py-2 text-sm text-primary cursor-pointer ${selectedSize === size.sizeValue ? "bg-secondary text-white" : ""}`}>{size.sizeValue}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
