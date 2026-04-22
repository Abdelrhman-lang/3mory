import React from 'react'
import CollectionImage from './CollectionImage'
import CollectionProducts from './CollectionProducts'

export default function CollectionSection({ imgSrc, title, text, reverse }) {
    return (
        <section className='py-16 px-5 md:px-10'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                <div className={`${reverse ? "order-2" : "order-1"}`}>
                    <CollectionImage collectionImgSrc={imgSrc} />
                </div>
                <div className={`${reverse ? "order-1" : "order-2"}`}>
                    <CollectionProducts title={title} text={text} />
                </div>
            </div>
        </section>
    )
}
