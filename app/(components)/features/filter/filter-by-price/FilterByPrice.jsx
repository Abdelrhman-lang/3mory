"use client"

import SecondartBtn from '@/app/(components)/ui/secondary-btn/SecondartBtn'
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'
import FilterHeader from '../filter-header/FilterHeader'

export default function FilterByPrice() {
    const [range, setRange] = useState([50, 500])
    const handelValueChange = (newValues) => {
        setRange(newValues)
    }
    return (
        <div>
            <FilterHeader title={"Filter By Price"} />
            <Slider defaultValue={[50, 500]} max={500} step={10} value={range} onValueChange={handelValueChange} className={"cursor-e-resize mb-7 "} />
            <div className='flex items-center justify-between'>
                <SecondartBtn title={"filter"} className={"px-5  py-2 uppercase font-medium rounded-[30px]"} onClick={() => console.log("price range:", range)} />
                <div className='text-[13px] text-accent'>${range[0]} - ${range[1]}</div>
            </div>
        </div>
    )
}
