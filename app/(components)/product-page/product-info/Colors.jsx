import React from 'react'

export default function Colors({ selectedSizeId, sizeColors, setSelectedColor, setSelectedMainImage, selectedColor }) {
    return (
        <div>
            <div className="flex items-center gap-10">
                <p className="capitalize text-primary font-bold text-xl">color:</p>
                {!selectedSizeId ? (
                    <p className="capitalize text-accent text-sm">please select size to show avilable colors</p>
                ) : (
                    <ul className="flex items-center gap-5">
                        {sizeColors.map((color) => {
                            return (
                                <li key={color.id}>
                                    <button onClick={() => {
                                        setSelectedColor(color.colorName)
                                        setSelectedMainImage(color.colorImage)
                                    }} className={`bg-[#f1f1f1] px-3 py-2 text-sm text-primary cursor-pointer ${selectedColor === color.colorName ? "bg-secondary text-white" : ""}`}>{color.colorName}</button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
