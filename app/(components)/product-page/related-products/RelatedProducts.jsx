"use client"
import SectionTitle from '../../ui/sec-title/SectionTitle'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../../features/product/product-card/ProductCard';
export default function RelatedProducts({ products }) {
    return (
        <div className='mt-10'>
            <SectionTitle title={"Related Products"} text={"Contemporary, minimal and modern designs embody the Lavish Alice handwriting"} />

            <div className='pb-16 border-b'>
                <Swiper className='mySwiper' modules={[Navigation]} navigation={true} loop={true} breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 }
                }} spaceBetween={30}>
                    {products.map((product) => {
                        return (
                            <SwiperSlide>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}
