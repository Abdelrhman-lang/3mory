import React from 'react'

export default function Pagenation() {
    return (
        <div className='mt-10 border p-3 flex justify-center items-center'>
            <ul className='flex items-center gap-5'>
                <li>
                    <button className='bg-secondary w-7 h-7 text-white text-sm'>1</button>
                </li>
                <li>
                    <button className='bg-[#f1f1f1] text-accent w-7 h-7 text-sm'>
                        2
                    </button>
                </li>
                <li>
                    <button className='bg-[#f1f1f1] text-accent w-7 h-7 text-sm'>3</button>
                </li>
                <li>
                    <button className='bg-[#f1f1f1] text-accent w-7 h-7 text-sm'>4</button>
                </li>
            </ul>
        </div>
    )
}
