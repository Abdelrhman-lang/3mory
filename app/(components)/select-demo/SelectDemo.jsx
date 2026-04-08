import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
    return (
        <Select>
            <SelectTrigger className="w-full max-w-48 border-none focus:ring-0 focus:outline-0">
                <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Langueges</SelectLabel>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabiv">Arabic</SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
