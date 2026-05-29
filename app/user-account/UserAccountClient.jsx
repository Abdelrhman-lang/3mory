"use client"
import { useEffect, useState } from 'react'
import UserAccountMenu from '../(components)/layout/user-account/menu/UserAccountMenu'
import BreadcrumbBasic from '../(components)/shared/breadcrumb/BreadcrumbBasic'
import AccountDetails from '../(components)/layout/user-account/content/account-details/AccountDetails'
import Orders from '../(components)/layout/user-account/content/orders/Orders'
import Wishlist from '../(components)/layout/user-account/content/wishlist/Wishlist'
import { getWishlist } from '@/services/wishlist/get/getWishlist'
export default function UserAccountClient({ user, userOrders }) {
    const [activeBtn, setActiveBtn] = useState("accountDetails")
    const [wishlistItems, setWishlistItems] = useState([])
    useEffect(()=> {
        async function fetchWishlist() {
            const result = await getWishlist(user?.email)
            setWishlistItems(result)
        }
        if (user?.email) {
            fetchWishlist()
        }
    }, [user?.email])
    return (
        <section className='pb-10'>
            <div className='custom-container'>
                <BreadcrumbBasic page='My Account' />

                <div className='mt-10'>
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5'>
                        <div className='md:col-span-3'>
                            <UserAccountMenu activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
                        </div>
                        <div className='md:col-span-9'>
                            {activeBtn === "accountDetails" ? <AccountDetails user={user} userOrders={userOrders} /> : activeBtn === "orders" ? <Orders userOrders={userOrders} /> : activeBtn === "wishlist" ? <Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems}/> : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
