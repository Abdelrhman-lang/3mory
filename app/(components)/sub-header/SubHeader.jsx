"use client"
import { usePathname } from "next/navigation";
import { SelectDemo } from "../select-demo/SelectDemo";


export default function SubHeader() {
    const pathname = usePathname()
    return (
        <section className={`py-3 w-full bg-primary ${pathname.includes("sign-in") || pathname.includes("sign-up") ? "hidden" : "hidden lg:flex"}`}>
            <div className='custom-container'>
                <div className='flex items-center justify-between'>
                    <div className='px-3 flex items-center gap-4'>
                        <div className='relative'>
                            <p className='text-xs text-white pr-4'>Free Delivery:<span className='text-accent'>Take advantage of our time to save event</span></p>
                            <div className='absolute top-1/2 right-0 -translate-y-1/2 text-white'>|</div>
                        </div>
                        <div>
                            <p className='text-xs text-white'> Free Returns *<span className='text-accent'>Satisfaction guaranteed</span></p>
                        </div>
                    </div>
                    <div>
                        <SelectDemo />
                    </div>
                </div>
            </div>
        </section>
    )
}
