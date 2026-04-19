import React from 'react'

export default function ProductDetailsDialogImgs({ smallImgs }) {
    return (
        <div className='col-span-3 md:col-span-5 lg:col-span-4'>
            <div>
                <img src="/imgs/product1.webp" alt="product-img" className="object-coverct-" />
            </div>
            <div className="mt-3">
                <div className="grid grid-cols-4 gap-2">
                    {smallImgs.map((img) => {
                        return (
                            <img src={img.src} alt="img" className="object-cover" />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
