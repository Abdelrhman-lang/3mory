import React from 'react'
import MainButton from '../main-button/MainButton'

export default function BannarText() {
    return (
        <div className='lg:pl-5 xl:pl-0'>
            <h1 className='text-xl md:text-4xl lg:text-5xl md:pt-7 lg:pt-0 text-center md:text-start text-primary font-semibold capitalize leading-7 md:leading-14 mb-20 md:mb-10 lg:mb-20'>
                Game Of Thrones Jaime<br />Lannister<br />Themed Sneakers
            </h1>
            <div className='text-center lg:text-start'>
                <MainButton title={"discover more"} />
            </div>



        </div >
    )
}
