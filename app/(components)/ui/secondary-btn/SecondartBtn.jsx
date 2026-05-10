import React from 'react'

export default function SecondartBtn({ className, title, onClick }) {
    return (
        <button onClick={onClick} className={`bg-primary  cursor-pointer transition-colors duration-300 text-white hover:bg-secondary uppercase font-medium text-xs ${className}`}>
            {title}
        </button>
    )
}
