"use client"
import Logo from './Logo'
import Search from './Search'
import Actions from './Actions'
import { Menu } from 'lucide-react'
import { useMenu } from '@/context/MenuContext'

export default function HeaderTop() {
    const { setIsMenuOpen, isMenuOpen } = useMenu()
    return (
        <div className='pt-10 pb-5 lg:px-8'>
            <div className='container mx-auto'>
                <div className='px-5 lg:px-3 flex items-center justify-between'>
                    <Logo />
                    <Search />
                    <Actions />
                    <div className='border border-primary p-2 rounded-sm lg:hidden'>
                        <Menu size={20} className='text-accent' onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>

                </div>

            </div>

        </div>
    )
}
