import React from 'react'

export default function FilterHeader({ title }) {
    return (
        <div>
            <h3 className='font-medium text-xl text-primary mb-4'>
                {title}
            </h3>
        </div>
    )
}
