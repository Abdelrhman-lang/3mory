"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const sortOptions = [
    { id: 1, title: "Sort by average rating", value: "averageRating" },
    { id: 2, title: "Sort by popularity", value: "popularity" },
    { id: 3, title: "Sort by newness", value: "new" },
    { id: 4, title: "Sort by price: low to high", value: "lowToHigh" },
    { id: 5, title: "Sort by price: high to low", value: "highToLow" },
    { id: 6, title: "Product Name: Z", value: "productName" },

]
export default function ShopSort({ onSortChange }) {
    return (
        <div>
            <Select onValueChange={onSortChange}>
                <SelectTrigger className="w-full max-w-48 border focus:ring-0 focus:outline-0 text-accent! text-[14px]">
                    <SelectValue placeholder="Select the Sort Option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        {sortOptions.map((option) => {
                            return (
                                <SelectItem key={option.id} value={option.value}>{option.title}</SelectItem>
                            )
                        })}

                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
