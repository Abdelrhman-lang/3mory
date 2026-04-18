import { Button } from '@/components/ui/button'
import React from 'react'

export default function MainButton({ title }) {
    return (
        <div className='relative group'>
            <button className='capitalize cursor-pointer text-[16px] pb-[5px] group-hover:text-secondary transition-colors duration-300'>{title}</button>
            <div className='absolute left-0 bottom-0 w-full h-[2px] bg-white group-hover:bg-secondary transition-colors duration-300'></div>
        </div>
    )
}
