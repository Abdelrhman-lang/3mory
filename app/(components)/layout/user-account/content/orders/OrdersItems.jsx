"use client"
import { CardImage } from "@/app/(components)/ui/card-image/CardImage"
import SecondartBtn from "@/app/(components)/ui/secondary-btn/SecondartBtn"
import { Spinner } from "@/components/ui/spinner"
import { getUserOrderItems } from "@/services/orders/getUserOrderItems"
import { useEffect, useState } from "react"

export default function OrdersItems({ orderId, onBack }) {
    const [loading, setLoading] = useState(true)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        async function fetchOrderItems() {
            setLoading(true)
            const items = await getUserOrderItems(orderId)
            setOrderItems(items)
            setLoading(false)
        }
        if (orderId) fetchOrderItems()
    }, [orderId])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] w-full">
                <span className="text-sm font-semibold text-accent"><Spinner className={"w-10 h-10"} /></span>
            </div>
        )
    }
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-md font-bold  text-primary uppercase">
                    Order Items for ID: {orderId}
                </h3>
                <SecondartBtn onClick={onBack} title={"Back"} className={"px-4 py-2 rounded-[3px]"} />
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {orderItems.map((item) => (
                    <CardImage key={item.id} orderItem={item} />
                ))}
            </div>
        </div>
    )
}
