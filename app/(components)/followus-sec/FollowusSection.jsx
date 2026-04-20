import React from 'react'
import SectionTitle from '../sec-title/SectionTitle'
import FollowusGrid from './FollowusGrid'

export default function FollowusSection() {
    return (
        <section className='pb-16 px-5 md:px-10'>
            <SectionTitle title={"follow us on instagram"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />

            <div className='mt-12 pb-20 border-b'>
                <FollowusGrid />
                <div className='flex items-center justify-center mt-5'>
                    <p className='text-accent text-sm'>#Follow us on Instagram</p>
                </div>
            </div>

        </section>
    )
}
