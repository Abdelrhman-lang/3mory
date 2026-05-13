"use client"

import { closeMenu } from "@/RTK/slices/menuSlice"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

const links = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Shop", href: "/shop" },

    { id: 4, title: "About", href: "/about" },
    { id: 5, title: "Contact", href: "/contact" },
]

export default function HeaderLinks({ ulClassName, liClassname, listStyle, divPosition }) {
    const pathname = usePathname()
    const dispatch = useDispatch()
    const { isMenuOpen } = useSelector((state) => state.menu)
    return (
        <div className={divPosition}>
            <ul className={ulClassName}>
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <li key={link.id} className={`${listStyle} `} onClick={() => dispatch(closeMenu())}>
                            <Link href={link.href} className={`transition-colors duration-300  ${isActive ? "text-secondary font-bold" : liClassname} ${liClassname}`}>{link.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
