import React from 'react'

export default function SectionTitle({ title, text }) {
    return (
        <div className='flex flex-col items-center gap-2.5 mb-7 text-center'>
            <h2 className='text-xl md:text-4xl text-primary font-bold capitalize'>{title}</h2>
            <p className='text-accent text-sm'>{text}</p>
        </div>
    )
}
