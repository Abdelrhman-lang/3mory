import React from 'react'
import BannarText from './BannarText'

export default function BannarSection() {
    return (
        <section className=' px-5 md:px-10'>
            <div className='relative h-[400px]  md:h-auto'>
                <img src="/imgs/banner2.webp" alt="bannar" className='h-full object-cover w-full' />
                <div className='custom-container absolute inset-0 flex items-center justify-center md:justify-start'>
                    <BannarText />
                </div>
            </div>
        </section>
    )
}
