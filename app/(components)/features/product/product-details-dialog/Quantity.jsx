import { FaMinus, FaPlus } from "react-icons/fa6";
export default function Quantity({ quantity, setQuantity }) {
    return (
        <div className="flex items-center gap-5">
            <button onClick={() => {
                if (quantity > 1) {
                    setQuantity(quantity - 1)
                }
            }} className="w-[40px] h-[40px] rounded-full bg-[#f1f1f1] flex items-center justify-center transition-colors duration-200 hover:bg-secondary hover:text-white cursor-pointer">
                <FaMinus size={15} />
            </button>
            <div className="w-[50px] h-[45px] border flex items-center justify-center text-sm">{quantity}</div>
            <button onClick={() => setQuantity(quantity + 1)} className="w-[40px] h-[40px] rounded-full bg-[#f1f1f1] flex items-center justify-center transition-colors duration-200 hover:bg-secondary hover:text-white cursor-pointer">
                <FaPlus size={13} />
            </button>
        </div>
    )
}
