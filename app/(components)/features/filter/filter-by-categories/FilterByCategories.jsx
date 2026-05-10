import React from 'react'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterByCategories({ onCategoryChange }) {
    const productCategories = [
        { id: 1, categoryName: "Shoes", value: "shoes", quantity: 6 },
        { id: 2, categoryName: "Handbag", value: "handBag", quantity: 10 },
    ]
    return (
        <div className='mt-12'>
            <FilterHeader title={"Product Categories"} />
            <div>
                <ul className='flex flex-col gap-3'>
                    {productCategories.map((cat) => {
                        return (
                            <li className='flex items-center justify-between cursor-pointer group' key={cat.id} onClick={() => onCategoryChange(cat.value)}>
                                <p className='text-sm text-primary transition-colors duration-200 group-hover:text-secondary'>{cat.categoryName}</p>
                                <div className='w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white'>
                                    {cat.quantity}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
