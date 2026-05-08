import React from 'react'

import BlogGrid from './BlogGrid'
import SectionTitle from '../../ui/sec-title/SectionTitle'

export default function BlogSection() {
    return (
        <section className='pb-16'>
            <SectionTitle title={"Latest Blogs"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />

            <div className='mt-12'>
                <div className='custom-container pb-20 border-b'>
                    <BlogGrid />
                </div>
            </div>
        </section>
    )
}
