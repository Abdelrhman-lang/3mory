"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterByCategories({ products }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const categories = [...new Set(products.map(p => p.category))]

    const handelFilter = (category) => {
        const params = new URLSearchParams(searchParams)

        const currentCategory = params.get("category")
        if (currentCategory === category) {
            params.delete("category", category)
        } else {
            params.set("category", category)
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }
    return (
        <div className='mt-12'>
            <FilterHeader title={"Product Categories"} />
            <div>
                <ul className='flex flex-col gap-3'>
                    {categories.map((categoryName) => {
                        const count = products.filter(p => p.category === categoryName).length
                        return (
                            <li className='flex items-center justify-between cursor-pointer group' key={categoryName} onClick={() => handelFilter(categoryName)}>
                                <p className={`text-sm ${searchParams.get("category") === categoryName ? "text-secondary font-medium" : "text-primary"} transition-colors duration-200 group-hover:text-secondary`}>{categoryName}</p>
                                <div className='w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white'>
                                    {count}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
