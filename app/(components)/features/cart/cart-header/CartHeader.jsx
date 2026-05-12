import { CircleX } from "lucide-react"

export default function CartHeader({ fn }) {
    return (
        <div className="flex items-center justify-between">
            <h3>Your Cart</h3>
            <CircleX size={20} className="cursor-pointer transition-colors duration-300 hover:text-secondary" onClick={fn} />
        </div>
    )
}
