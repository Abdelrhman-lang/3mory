import React from 'react'
import FilterByPrice from './filter-by-price/FilterByPrice'
import FilterByCategories from './filter-by-categories/FilterByCategories'
import FilterByColor from './filter-by-color/FilterByColor'
import FilterBySize from './filter-by-size/FilterBySize'

export default function ShopFilter() {
    return (
        <div className='pb-24'>
            <FilterByPrice />
            <FilterByCategories />
            <FilterByColor />
            <FilterBySize />
        </div>
    )
}
