import React from 'react'
import { SelectDemo } from '../../select-demo/SelectDemo'
import { CategoryList } from '../../category-list/CategoryList'
import { Input } from '@/components/ui/input'
import { CiSearch } from "react-icons/ci";

export default function Search() {
    return (
        <div className='hidden lg:block lg:w-1/3'>
            <div className='border flex items-center rounded-full'>
                <div className='px-3 py-2 h-full bg-[#f6f6f6] rounded-l-full'>
                    <CategoryList />
                </div>
                <div className='flex-1 flex items-center px-4'>
                    <Input />
                    <CiSearch size={23} />
                </div>
            </div>

        </div>
    )
}
