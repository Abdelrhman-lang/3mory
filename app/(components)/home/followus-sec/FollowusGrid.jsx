"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoLogoInstagram } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';

const instagramImgs = [
    { id: 1, imgSrc: "/imgs/intagram1.webp", },
    { id: 2, imgSrc: "/imgs/intagram2.webp", },
    { id: 3, imgSrc: "/imgs/intagram3.webp", },
    { id: 4, imgSrc: "/imgs/intagram4.webp", },
    { id: 5, imgSrc: "/imgs/intagram5.webp", },
    { id: 6, imgSrc: "/imgs/intagram3.webp", },
]

export default function FollowusGrid() {
    return (
        <div>
            <Swiper className='mySwiper' modules={[Navigation]} navigation={true} loop={true} breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 }
            }} spaceBetween={30}>
                {instagramImgs.map((img) => {
                    return (
                        <SwiperSlide key={img.id}>
                            <div className='relative group cursor-pointer'>
                                <img src={img.imgSrc} alt='intagram-img' className='object-cover' />
                                <div className='absolute left-0 top-0 w-full h-full bg-black/60 z-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center'>
                                    <IoLogoInstagram size={40} className='text-white transition-colors duration-300 hover:text-secondary' />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
