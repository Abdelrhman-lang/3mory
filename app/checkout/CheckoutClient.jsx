"use client"
import { useDispatch, useSelector } from 'react-redux'
import BreadcrumbBasic from '../(components)/shared/breadcrumb/BreadcrumbBasic'
import CheckoutDetails from '../(components)/ui/checkout/details/CheckoutDetails'
import CheckoutOrder from '../(components)/ui/checkout/order-details/CheckoutOrder'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { getCartItems } from '@/RTK/slices/cartSlice'


export default function CheckoutClient() {
    const { user } = useUser()
    const { items, totalPrice } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const userEmail = user?.primaryEmailAddress?.emailAddress
    useEffect(() => {
        dispatch(getCartItems({ userEmail }))
    }, [userEmail])
    return (
        <section>
            <div className='custom-container'>
                <BreadcrumbBasic page='checkout' />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-12'>
                    <div>
                        <CheckoutDetails />
                    </div>
                    <div>
                        <CheckoutOrder items={items} totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </section>
    )
}
