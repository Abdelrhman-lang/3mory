"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterByBrand({ products }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const brands = [...new Set(products.map(p => p.brand))]

    const handelFilter = (brand) => {
        const params = new URLSearchParams(searchParams)

        const currentBrand = params.get("brand")
        if (currentBrand === brand) {
            params.delete("brand", brand)
        } else {
            params.set("brand", brand)
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }
    return (
        <div className='mt-12'>
            <FilterHeader title={"Filter By Brand"} />
            <div>
                <ul className='flex flex-col gap-3'>
                    {brands.map((brandName) => {
                        const count = products.filter(p => p.brand === brandName).length
                        return (
                            <li className='flex items-center justify-between cursor-pointer group' key={brandName} onClick={() => handelFilter(brandName)}>
                                <p className={`text-sm ${searchParams.get("brand") === brandName ? "text-secondary" : "text-primary"} transition-colors duration-200 group-hover:text-secondary`}>{brandName}</p>
                                <div className='w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white'>
                                    {count}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div >
    )
}
