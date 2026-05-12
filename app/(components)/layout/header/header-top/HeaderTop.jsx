"use client"
import Logo from './Logo'
import Search from './Search'
import Actions from './Actions'
import { Menu } from 'lucide-react'
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '@/RTK/slices/cartSlice'
import { toggleMenu } from '@/RTK/slices/menuSlice'



export default function HeaderTop() {
    // const { setIsMenuOpen, isMenuOpen } = useMenu()
    const dispatch = useDispatch()
    return (
        <div className='pt-10 pb-5'>
            <div className='flex items-center justify-between'>
                <Logo />
                <Search />
                <Actions className={"hidden"} />
                <div className='flex items-center gap-3 lg:hidden'>
                    <div className='border border-primary p-2 rounded-sm cursor-pointer transition-colors duration-300 hover:text-secondary hover:border-secondary text-accent'>
                        <Menu size={20} onClick={() => dispatch(toggleMenu())} />
                    </div>
                    <div className='border border-primary p-2 rounded-sm cursor-pointer transition-colors duration-300 hover:text-secondary hover:border-secondary text-accent ' onClick={() => dispatch(toggleCart())}>
                        <FaShoppingCart size={20} />
                    </div>
                </div>

            </div>



        </div>
    )
}
