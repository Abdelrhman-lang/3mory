"use client"
import Image from 'next/image'
import { useState } from 'react'


export default function ProductImages({ mainImage }) {

    return (
        <div className='flex items-center justify-center'>
            <Image src={mainImage.trim()} alt='product-image' width={500} height={500} className='w-full h-full object-cover bg-[#acacaa]' />
        </div>
    )
}
