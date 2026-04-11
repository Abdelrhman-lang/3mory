"use client"
import { FaShoppingBasket } from "react-icons/fa";
import Cart from "../../cart/Cart";
import { UseCart } from "@/context/CartContext";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Actions({ className }) {
    const { setIsCartOpen } = UseCart()
    const { isSignedIn } = useUser()
    return (
        <div className={`${className} lg:flex lg:w-1/4 justify-end`}>
            <div className='flex flex-col lg:flex-row gap-3 items-center lg:gap-5'>
                {isSignedIn ? <UserButton /> : <div>
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
                    <div className="flex items-center gap-2 text-xs text-accent cursor-pointer transition-colors duration-300 hover:text-secondary" onClick={() => setIsCartOpen(true)}>
                        <FaShoppingBasket size={20} /> 2 Item(s)
                    </div>
                </div>
            </div>
        </div>
    )
}
