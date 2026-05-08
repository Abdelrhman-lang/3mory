import React from 'react'

export default function CollectionImage({ collectionImgSrc }) {
    return (
        <div className='flex items-center justify-center lg:items-start lg:justify-start'>
            <img src={collectionImgSrc} alt='collection-image' className='object-cover' />
        </div>
    )
}
