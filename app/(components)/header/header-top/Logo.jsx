import Image from 'next/image'
import React from 'react'

export default function Logo() {
    return (
        <div>
            <img src='/imgs/logo.webp' alt='logo' loading='lazy' className='object-cover' />
        </div>
    )
}
