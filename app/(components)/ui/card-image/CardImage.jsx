
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function CardImage({ orderItem }) {
    return (
        <Card className="relative mx-auto w-full  pt-0">
            <img
                src={orderItem.image}
                alt="Event cover"
                className=" w-full object-cover "
            />
            <CardHeader>

                <CardTitle>{orderItem.productName}</CardTitle>
                <CardDescription className={""}>
                    <p> Color: {orderItem.color}</p>
                    <p> Size: {orderItem.size}</p>
                    <p>Price: ${orderItem.price}</p>
                    <p> Quantity: {orderItem.quantity}</p>

                </CardDescription>
            </CardHeader>
        </Card>
    )
}
