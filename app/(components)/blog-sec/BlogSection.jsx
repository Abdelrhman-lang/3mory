import React from 'react'
import SectionTitle from '../sec-title/SectionTitle'
import BlogGrid from './BlogGrid'

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
