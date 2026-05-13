"use client"
import ProductImages from '@/app/(components)/product-page/product-images/ProductImages'
import ProductInfo from '@/app/(components)/product-page/product-info/ProductInfo'
import RelatedProducts from '@/app/(components)/product-page/related-products/RelatedProducts'
import BreadcrumbBasic from '@/app/(components)/shared/breadcrumb/BreadcrumbBasic'
import React, { useState } from 'react'


export default function PageClient({ uniqueProduct, product, products }) {
    const [mainImage, setMainImage] = useState(uniqueProduct.image)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedSizeId, setSelectedSizeId] = useState(null)
    const [quantity, setQuantity] = useState(1)


    return (
        <section>
            <div className='custom-container'>
                <BreadcrumbBasic page='Product Details' />

                <div className='grid grid-cols-1 md:grid-cols-12 gap-6 py-10'>
                    <div className='col-span-5'>
                        <ProductImages product={uniqueProduct} mainImage={mainImage} setMainImage={setMainImage} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
                    </div>
                    <div className='col-span-7'>
                        <ProductInfo product={product} uniqueProduct={uniqueProduct} mainImage={mainImage} setSelectedMainImage={setMainImage} setSelectedColor={setSelectedColor} selectedColor={selectedColor} selectedSize={selectedSize} setSelectedSize={setSelectedSize} selectedSizeId={selectedSizeId} setSelectedSizeId={setSelectedSizeId} quantity={quantity} setQuantity={setQuantity} />
                    </div>
                </div>

                <RelatedProducts products={products} />
            </div>
        </section>
    )
}
