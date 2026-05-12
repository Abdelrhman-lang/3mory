"use client"
import { CircleX } from 'lucide-react'
import React from 'react'
import HeaderLinks from '../header-links/HeaderLinks'
import SocialmediaLinks from '../../../features/socialmedia-links/SocialmediaLinks'
import Overlay from '../../../shared/overlay/Overlay'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '@/RTK/slices/menuSlice'


export default function HeaderMenu() {
    const dispatch = useDispatch()
    const { isMenuOpen } = useSelector((state) => state.menu)


    return (
        <div className='lg:hidden'>
            <Overlay prop={isMenuOpen} fn={() => dispatch(closeMenu())} />
            <div className={`fixed z-50 top-0 ${isMenuOpen ? "left-0" : "-left-full"} w-3/4 h-full bg-white border-r shadow-sm transition-all duration-700`}>

                <div className='pt-10 px-5 flex items-center justify-between'>
                    <h3 className='font-bold'>Menu</h3>
                    <CircleX size={20} onClick={() => dispatch(closeMenu())} className='cursor-pointer' />
                </div>
                <div className='pt-10 px-5'>
                    <HeaderLinks ulClassName={"flex flex-col gap-5"} liClassname={"text-accent text-sm"} listStyle={"border-b pb-3"} />
                </div>

                <div className='mt-8 text-center'>
                    <a href="mailto:abdokhaled766@gmail.com" className='text-sm text-accent'>abdokhaled766@gmail.com</a>
                    <SocialmediaLinks />
                </div>
            </div>
        </div>

    )
}
