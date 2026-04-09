"use client"
import { useMenu } from '@/context/MenuContext'
import { CircleX } from 'lucide-react'
import React from 'react'
import HeaderLinks from '../header-links/HeaderLinks'
import SocialmediaLinks from '../../socialmedia-links/SocialmediaLinks'


export default function HeaderMenu() {
    const { isMenuOpen, setIsMenuOpen } = useMenu()


    return (
        <div className='lg:hidden'>
            <div className={`fixed inset-0 bg-black/50 z-40  transition-opacity duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
            <div className={`fixed z-50 top-0 ${isMenuOpen ? "left-0" : "-left-full"} w-3/4 h-full bg-white border-r shadow-sm transition-all duration-700`}>

                <div className='pt-10 px-5 flex items-center justify-between'>
                    <h3 className='font-bold'>Menu</h3>
                    <CircleX size={20} onClick={() => setIsMenuOpen(false)} />
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
