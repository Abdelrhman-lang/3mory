import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import ProductCard from '../../features/product/product-card/ProductCard';
export default function SwiperGrid({ products }) {
    return (
        <div>
            <Swiper
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    },
                    768: {
                        slidesPerView: 3,
                        grid: {
                            rows: 2,
                            fill: "row"
                        }
                    }
                }}

                spaceBetween={20}
                navigation={true}
                modules={[Grid, Navigation]}
                className="mySwiper"
            >
                {products?.map((p) => {
                    return (
                        <SwiperSlide key={p.id} >
                            <ProductCard product={p} />

                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
