import React from 'react'
import CollectionImage from './CollectionImage'
import CollectionProducts from './CollectionProducts'

export default function CollectionSection({ imgSrc, title, text }) {
    return (
        <section className='py-16 px-10'>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                <CollectionImage collectionImgSrc={imgSrc} />
                <CollectionProducts title={title} text={text} />
            </div>


        </section>
    )
}
