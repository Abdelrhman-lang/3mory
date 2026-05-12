import { FaTrash } from "react-icons/fa6";

export default function CartItems({ items, dispatch, deleteItemFromCart, userEmail }) {
    return (
        <div className="flex flex-col gap-5 mt-10">
            {items.map((item) => {
                return (
                    <div className="pb-3 border-b flex items-center justify-between" key={item.id}>
                        <div className="flex items-center gap-4">
                            <img src={item.colorImage} alt="product-img" className="object-cover bg-[#acacaa] w-[80px] h-[80px]" />
                            <div className="flex flex-col gap-1 text-[13px]">
                                <h3 className="font-bold">{item.name}</h3>

                                <div className="flex items-center gap-5">
                                    <p className="text-accent">{item.quantity}x ${item.price} </p>
                                    <p className="text-accent font-bold">${item.quantity * item.price}</p>
                                </div>


                                <div className="flex items-center gap-2">
                                    <span>Size: </span>
                                    <span className="text-secondary">{item.size}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>color: </span>
                                    <span className="text-secondary">{item.colorValue}</span>
                                </div>
                            </div>
                        </div>

                        <div className="cursor-pointer">
                            <button onClick={() => dispatch(deleteItemFromCart({ itemId: item.id, userEmail }))}>
                                <FaTrash size={20} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
