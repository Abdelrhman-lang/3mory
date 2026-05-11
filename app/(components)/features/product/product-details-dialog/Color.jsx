import React from 'react'

export default function Color({ selectedSize, allProductsColors, currentColors, setSelectedMainImg, selectedImage, setSelectedImage }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="uppercase font-medium">color</span>
            {!selectedSize ? (
                <ul className="flex items-center gap-5">
                    {allProductsColors.map((color) => {

                        return (
                            <li key={color.id} onClick={() => {
                                setSelectedMainImg(color.colorImage)
                                setSelectedImage(color)
                            }}>
                                <img src={color.colorImage} alt="colorImage" className={`object-cover w-[70px] h-[70px] rounded-md ${selectedImage?.id === color.id ? "border border-secondary" : ""}`} />
                            </li>
                        )
                    })}

                </ul>
            ) : currentColors.length > 0 ? (
                <ul className="flex items-center gap-5">
                    {currentColors.map((color) => (
                        <li
                            key={color.id}
                            className="group relative cursor-pointer  flex items-center justify-center"
                            title={color.colorName}
                            onClick={() => {
                                setSelectedMainImg(color.colorImage)
                                setSelectedImage(color)
                            }}
                        >
                            {color.colorImage ? (
                                <img src={color.colorImage} className={`w-[70px] h-[70px] rounded-md object-cover border ${selectedImage.id === color.id ? "border border-secondary" : ""}`} />
                            ) : (
                                <div style={{ backgroundColor: color.colorCode }} className="w-full h-full rounded-full" />
                            )}
                        </li>
                    ))}
                </ul>
            ) : <p className="text-xs text-red-500">No colors available for this size</p>}
        </div>
    )
}
