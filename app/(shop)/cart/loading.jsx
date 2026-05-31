import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function loading() {
    return (
        <div className='fixed inset-0 bg-white z-50 flex items-center justify-center w-screen h-screen'>

            <Spinner className={"size-14"} />

        </div>
    )
}
