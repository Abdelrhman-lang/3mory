import React from 'react'
import FilterByPrice from './filter-by-price/FilterByPrice'
import FilterByCategories from './filter-by-categories/FilterByCategories'
import FilterByColor from './filter-by-color/FilterByColor'
import FilterBySize from './filter-by-size/FilterBySize'
import FilterByBrand from './filter-by-brand/FilterByBrand'


export default function ShopFilter({ products }) {
    return (
        <div className='pb-24'>
            <FilterByPrice />
            <FilterByCategories products={products} />
            <FilterByBrand products={products} />
            {/* <FilterByColor />
            <FilterBySize /> */}
        </div>
    )
}
