import React from 'react'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterByColor({ onColorChange }) {
    const colors = [
        { id: 1, colorName: "Red", value: "red", quantity: 7 },
        { id: 2, colorName: "Blue", value: "blue", quantity: 10 },
        { id: 3, colorName: "Green", value: "green", quantity: 6 },
        { id: 4, colorName: "Yellow", value: "yellow", quantity: 4 },
        { id: 5, colorName: "Brown", value: "brown", quantity: 5 },
        { id: 6, colorName: "White", value: "white", quantity: 3 },
        { id: 7, colorName: "Pink", value: "pink", quantity: 7 },
    ]
    return (
        <div className='mt-12'>
            <FilterHeader title={"Filter By Color"} />
            <div>
                <ul className='flex flex-col gap-3'>
                    {colors.map((color) => {
                        return (
                            <li className='flex items-center justify-between cursor-pointer group' key={color.id} onClick={() => onColorChange(color.value)}>
                                <p className='text-sm text-primary transition-colors duration-200 group-hover:text-secondary'>{color.colorName}</p>
                                <div className='w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white'>
                                    {color.quantity}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
