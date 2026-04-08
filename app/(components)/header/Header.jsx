import React from 'react'
import HeaderTop from './header-top/HeaderTop'
import HeaderBottom from './header-bottom/HeaderBottom'
import HeaderMenu from './header-menu/HeaderMenu'

export default function Header() {
    return (
        <header className='relative'>
            <div className='container mx-auto'>
                <HeaderTop />
                <HeaderBottom />
                <HeaderMenu />
            </div>

        </header>
    )
}
