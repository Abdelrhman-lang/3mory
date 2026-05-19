"use client"
import { FaShoppingBasket } from "react-icons/fa";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItems, toggleCart } from "@/RTK/slices/cartSlice";
import { User } from "lucide-react";

export default function Actions({ className }) {

    const { isSignedIn, user } = useUser()
    const dispatch = useDispatch()
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const { items, isOpen } = useSelector((state) => state.cart)

    useEffect(() => {
        if (userEmail) {
            dispatch(getCartItems({ userEmail }))
        }
    }, [userEmail])

    return (
        <div className={`${className} lg:flex lg:w-1/4 justify-end`}>
            <div className='flex flex-col lg:flex-row gap-3 items-center lg:gap-5'>
                {isSignedIn ? <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Link href="/user-account" label="View My Account" labelIcon={<User className="w-4 h-4" />} />
                    </UserButton.MenuItems>
                </UserButton> : <div>
                    <ul className='flex items-center gap-3 text-primary text-xs'>
                        <li className="transition-colors duration-300 hover:text-secondary">
                            <Link href={"/sign-in"}>Login</Link>
                        </li>
                        <li>/</li>
                        <li className="transition-colors duration-300 hover:text-secondary">

                            <Link href={"/sign-up"}>Register</Link>
                        </li>
                    </ul>
                </div>}
                <div className='border px-4 py-2.5 rounded-full  group'>
                    <div className="flex items-center gap-2 text-xs text-accent cursor-pointer transition-colors duration-300 hover:text-secondary" onClick={() => dispatch(toggleCart())}>
                        <FaShoppingBasket size={20} /> {items.length} Item(s)

                    </div>

                </div>

            </div>
        </div>
    )
}
