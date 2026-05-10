import React from 'react'

export default function ProductDetailsDialogImgs({ productImg }) {
    return (
        <div className='col-span-3 md:col-span-5 lg:col-span-4'>
            <div>
                <img src={productImg} alt="product-img" className="object-coverct-" />
            </div>

        </div>
    )
}
