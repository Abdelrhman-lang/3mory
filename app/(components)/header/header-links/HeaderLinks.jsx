"use client"
import { useMenu } from "@/context/MenuContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Shop", href: "/shop" },

    { id: 4, title: "About", href: "/about" },
    { id: 5, title: "Contact", href: "/contact" },
]

export default function HeaderLinks({ ulClassName, liClassname, listStyle, divPosition }) {
    const pathname = usePathname()
    const { setIsMenuOpen } = useMenu()
    return (
        <div className={divPosition}>
            <ul className={ulClassName}>
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <li key={link.id} className={`${listStyle} `} onClick={() => setIsMenuOpen(false)}>
                            <Link href={link.href} className={`transition-colors duration-300  ${isActive ? "text-secondary font-bold" : liClassname} ${liClassname}`}>{link.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
