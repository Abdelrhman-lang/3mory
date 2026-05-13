import { FaMinus, FaPlus } from "react-icons/fa";

const btnStyle = "w-[40px] h-[40px] bg-[#f1f1f1] text-primary flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:text-white hover:bg-secondary"
export default function Quantity({ quantity, setQuantity }) {
    return (
        <div>
            <div className="flex items-center gap-5">
                {/* Quantity */}
                <p className="capitalize font-bold text-xl">quantity:</p>
                <div className="flex items-center gap-2 md:gap-6">
                    <button onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }} className={btnStyle}>
                        <FaMinus size={13} />
                    </button>

                    <div className="border w-[70px] h-[45px] px-5 flex items-center justify-center">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className={btnStyle}>
                        <FaPlus size={13} />
                    </button>
                </div>
            </div>
        </div>
    )
}
