


export default function CartPrices({ totalPrice, vat }) {
    return (
        <div className="mt-5 text-sm w-1/2">
            <div className=" flex items-center justify-between font-bold">
                <p>Subtotal:</p>
                <p>${totalPrice}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
                <p>Vat:</p>
                <p>${vat}</p>
            </div>
            <div className="flex items-center justify-between font-bold mt-3">
                <p>Total:</p>
                <p className="text-secondary">${totalPrice + vat}</p>
            </div>
        </div>



    )
}
