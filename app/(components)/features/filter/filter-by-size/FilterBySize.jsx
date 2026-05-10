import React from 'react'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterBySize({ onSizeChange }) {
    const sizes = [
        { id: 1, size: "Small", value: "small", quantity: 7 },
        { id: 2, size: "Meduim", value: "meduim", quantity: 9 },
        { id: 3, size: "Large", value: "large", quantity: 10 },
        { id: 4, size: "Xlarge", value: "small", quantity: 8 },
    ]
    return (
        <div className='mt-12'>
            <FilterHeader title={"Filter By Size"} />
            <div>
                <ul className='flex flex-col gap-3'>
                    {sizes.map((size) => {
                        return (
                            <li className='flex items-center justify-between cursor-pointer group' key={size.id} onClick={() => onSizeChange(size.value)}>
                                <p className='text-sm text-primary transition-colors duration-200 group-hover:text-secondary'>{size.size}</p>
                                <div className='w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white'>
                                    {size.quantity}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
