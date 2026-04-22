import React from 'react'

export default function SecondartBtn({ className, title }) {
    return (
        <button className={`bg-primary rounded-xs cursor-pointer transition-colors duration-300 text-white hover:bg-secondary uppercase font-medium text-xs ${className}`}>
            {title}
        </button>
    )
}
