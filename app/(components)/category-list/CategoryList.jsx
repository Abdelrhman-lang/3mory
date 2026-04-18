import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const categoryList = [
    { id: 1, title: "Men", value: "men" },
    { id: 2, title: "Women", value: "women" },
    { id: 3, title: "Accessories", value: "acc" },
    { id: 4, title: "Shoes", value: "shoes" },
]

export function CategoryList() {
    return (
        <Select>
            <SelectTrigger className="w-full max-w-48 border-none focus:ring-0 focus:outline-0 text-primary!">
                <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>All Categories</SelectLabel>
                    {categoryList.map((item) => {
                        return (
                            <SelectItem value={item.value} key={item.key}>{item.title}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
