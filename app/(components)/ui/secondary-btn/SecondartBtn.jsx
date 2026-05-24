import React from 'react'

export default function SecondartBtn({ className, title, onClick, loading }) {
    return (
        <button onClick={onClick} disabled={loading} className={`bg-primary  cursor-pointer transition-colors duration-300 text-white hover:bg-secondary uppercase font-medium text-xs ${className}`}>
            {title}
        </button>
    )
}
