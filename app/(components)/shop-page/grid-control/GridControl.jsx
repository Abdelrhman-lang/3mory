"use client"
import { TbGridDots } from "react-icons/tb";
import { MdGridView } from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";
const icons = [
    { id: 1, icon: TbGridDots, value: "grid3" },
    { id: 2, icon: MdGridView, value: "grid4" },
    { id: 3, icon: BsGrid3X3Gap, value: "grid5" },
]
export default function GridControl({ gridOption, setGridOption }) {
    return (
        <div className='flex items-center gap-5'>
            {icons.map((icon) => {
                const isActive = gridOption === icon.value
                return (
                    <button className="cursor-pointer" key={icon.id} onClick={() => setGridOption(icon.value)}>
                        <icon.icon size={22} className={`${isActive ? "text-secondary" : "text-accent"} transition-colors duration-200`} />
                    </button>
                )
            })}
        </div>
    )
}
