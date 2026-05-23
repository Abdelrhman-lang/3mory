"use client"

import SecondartBtn from "../../secondary-btn/SecondartBtn"

const tableHeads = [
    { id: 1, title: "product" },
    { id: 2, title: "total" },
]
const shipping = 50
export default function CheckoutOrder({ items, totalPrice }) {
    return (
        <div className='space-y-3'>
            <h3 className='bg-primary text-white uppercase font-semibold p-2'>
                your order
            </h3>

            <div className='w-full'>
                <table className='w-full overflow-y-scroll'>
                    <thead className='bg-[#f2f2f2]'>
                        {tableHeads.map((thead) => {
                            return <td className='text-center py-4 text-sm capitalize font-bold text-accent' onClick={() => console.log(items)} key={thead.id}>{thead.title}</td>
                        })}
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            return <tr className="border">
                                {/* name */}
                                <td className="p-2 text-center border-r text-sm">{item?.name} <span className="text-xs font-bold">x{item.quantity}</span></td>
                                <td className="text-center text-sm">${item.price * item?.quantity}</td>
                            </tr>
                        })}

                        <tr className="border-t border-b">
                            <td className="text-sm font-bold text-accent capitalize text-center p-3">cart subtotal</td>
                            <td className="text-sm  text-center p-3">${totalPrice}</td>
                        </tr>
                        <tr className="border-t border-b">
                            <td className="text-sm font-bold text-accent capitalize text-center p-3">shipping</td>
                            <td className="text-sm  text-center p-3">${shipping}</td>
                        </tr>
                        <tr className="border-t border-b">
                            <td className="text-sm font-bold text-accent capitalize text-center p-3">order total</td>
                            <td className="text-sm  text-center p-3 text-accent font-bold">${totalPrice + shipping}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-12 flex justify-end">
                    <SecondartBtn title={"place order"} className={"px-4 py-2 rounded-[3px]"} />
                </div>
            </div>
        </div>
    )
}
