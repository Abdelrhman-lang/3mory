"use client"
import { useState } from "react"
import OrdersItems from "./OrdersItems"
const tableHeads = [
    { id: 1, title: "order id" },
    { id: 2, title: "date" },
    { id: 3, title: "status" },
    { id: 4, title: "total" },
    { id: 5, title: "actions" },
]
const tdStyle = "p-2.5 border-r"
const centerItems = "flex items-center justify-center"
const textStyle = "text-accent text-sm font-semibold"
export default function Orders({ userOrders }) {

    const [selectedOrderId, setSelectedOrderId] = useState(null)

    if (selectedOrderId) {
        return <OrdersItems orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
    }
    return (
        <div className='w-full'>
            <div className='overflow-x-scroll xl:overflow-x-hidden'>
                <table className='w-full min-w-[800px]'>
                    <thead className='border bg-[#f2f2f2]'>
                        {tableHeads.map((tb) => {
                            return (
                                <th key={tb.id} className="border-b-4 border-b-secondary text-accent font-semibold uppercase p-2.5 text-center">
                                    {tb.title}
                                </th>
                            )
                        })}
                    </thead>
                    <tbody>
                        {userOrders?.map((order) => {
                            return (
                                <tr key={order.id} className='border-b border-l text-center'>
                                    {/* ID */}
                                    <td className={tdStyle}>
                                        <div className={centerItems}>
                                            <p className={textStyle} onClick={() => console.log(user)}>
                                                {order?.id}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Date */}
                                    <td className={tdStyle}>
                                        <div className={centerItems}>
                                            <p className={textStyle} onClick={() => console.log(user)}>
                                                {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Status */}
                                    <td className={tdStyle}>
                                        <div className={centerItems}>
                                            <p className={textStyle} onClick={() => console.log(user)}>
                                                {order?.status}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Total */}
                                    <td className={tdStyle}>
                                        <div className={centerItems}>
                                            <p className={textStyle} onClick={() => console.log(user)}>
                                                {order?.totalPrice}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    <td className={tdStyle}>
                                        <div className={centerItems}>
                                            <button onClick={() => setSelectedOrderId(order.id)} className={`${textStyle} text-secondary capitalize cursor-pointer`}>
                                                view
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
