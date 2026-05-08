"use client"
import HeaderTop from './header-top/HeaderTop'
import HeaderBottom from './header-bottom/HeaderBottom'
import HeaderMenu from './header-menu/HeaderMenu'
import { usePathname } from 'next/navigation'


export default function Header() {
    const pathname = usePathname()
    return (
        <header className={`relative ${pathname.includes("sign-in") || pathname.includes("sign-up") ? "hidden" : "block"}`}>
            <div className='custom-container'>
                <HeaderTop />
                <HeaderBottom />
                <HeaderMenu />
            </div>

        </header>
    )
}
