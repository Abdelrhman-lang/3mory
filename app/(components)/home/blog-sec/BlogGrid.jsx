"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const blogCards = [
    { id: 1, imgSrc: "/imgs/blog1.webp", title: "Mercedes Benz– Mirror To The Soul 360" },
    { id: 2, imgSrc: "/imgs/blog2.webp", title: "Dior F/W 2015 First Fashion Experience" },
    { id: 3, imgSrc: "/imgs/blog3.webp", title: "London Fashion Week & Royal Day" },
    { id: 4, imgSrc: "/imgs/blog1.webp", title: "London Fashion Week & Royal Day", },
    { id: 5, imgSrc: "/imgs/blog2.webp", title: "London Fashion Week & Royal Day", },
    { id: 6, imgSrc: "/imgs/blog3.webp", title: "London Fashion Week & Royal Day", },
]
export default function BlogGrid() {
    return (


        <Swiper className='mySwiper' modules={[Navigation]} navigation={true} loop={true} breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }} spaceBetween={30}>
            {blogCards.map((card) => {
                return (
                    <SwiperSlide key={card.id}>
                        <div className='mb-5 cursor-pointer'>
                            <img src={card.imgSrc} alt="blog-img" className='object-cover transition-all duration-300 hover:grayscale' />
                        </div>
                        <div className='space-y-3 text-start'>
                            <h4 className='text-sm font-bold transition-colors duration-300 hover:text-secondary'>
                                {card.title}
                            </h4>
                            <p className='text-sm text-accent'>
                                By <span className='text-secondary'>Boda</span> / 20 Apr 2026
                            </p>
                            <p className='text-accent text-sm'>
                                Maria Denardo is the Fashion Director at theFashionSpot. Prior to joining tFS, she worked as...
                            </p>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>


    )
}
