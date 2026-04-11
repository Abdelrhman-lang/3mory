"use client"
import Logo from './Logo'
import Search from './Search'
import Actions from './Actions'
import { Menu } from 'lucide-react'
import { useMenu } from '@/context/MenuContext'
import { FaShoppingCart } from "react-icons/fa";

import { UseCart } from '@/context/CartContext'

export default function HeaderTop() {
    const { setIsMenuOpen, isMenuOpen } = useMenu()
    const { isCartOpen, setIsCartOpen } = UseCart()
    return (
        <div className='pt-10 pb-5 lg:px-8'>
            <div className='container mx-auto'>
                <div className='px-5 lg:px-3 flex items-center justify-between'>
                    <Logo />
                    <Search />
                    <Actions className={"hidden"} />
                    <div className='flex items-center gap-3 lg:hidden'>
                        <div className='border border-primary p-2 rounded-sm '>
                            <Menu size={20} className='text-accent' onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        </div>
                        <div className='border border-primary p-2 rounded-sm' onClick={() => setIsCartOpen(!isCartOpen)}>
                            <FaShoppingCart size={20} className='text-accent' />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
