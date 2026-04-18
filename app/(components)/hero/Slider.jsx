"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SliderText from './SliderText';
const slides = [
    { id: 1, img: "/imgs/slide1.webp", textImg: "/imgs/content1.webp", imgStyle: "w-[200px]! h-[100px]! md:w-[300px]! md:h-[150px]! lg:w-[480px]! lg:h-full!" },
    { id: 2, img: "/imgs/slide2.webp", textImg: "/imgs/content2.webp", imgStyle: "w-[200px]! h-[100px]! md:w-[300px]! md:h-[150px]! lg:w-[480px]! lg:h-full!" },
    { id: 3, img: "/imgs/slide3.webp", textImg: "/imgs/content3.webp", imgStyle: "w-[200px]! h-[120px]! md:w-[300px]! md:h-[180px]! lg:w-[480px]! lg:h-full!" },
]
export default function Slider() {
    return (
        <section >
            <Swiper navigation={true} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} modules={[Navigation, Pagination, Autoplay]} className='mySwiper w-full h-full' loop={true}>
                {slides.map((slide) => {
                    return (
                        <SwiperSlide key={slide.id}>
                            {({ isActive }) => (
                                <div className='relative h-[400px] lg:h-[600px]'>
                                    <img src={slide.img} alt="slide-img" loading='lazy' />
                                    {isActive && (
                                        <div className='custom-container absolute inset-0 flex items-center justify-center lg:justify-start'>
                                            <SliderText imgSrc={slide.textImg} imgStyle={slide.imgStyle} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}
