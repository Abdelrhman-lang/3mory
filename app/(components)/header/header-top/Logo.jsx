import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <div className='lg:w-1/4'>
            <img src='/imgs/logo.png' alt='logo' loading='lazy' className='object-cover w-[120px] lg:w-[150px]' />
        </div>
    )
}
