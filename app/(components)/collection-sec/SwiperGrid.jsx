import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ProductDetailsDialog } from '../product-details-dialog/ProductDetailsDialog';
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
                {products.map((p) => {
                    return (
                        <SwiperSlide key={p.id} >
                            <div>
                                <div className='relative cursor-pointer overflow-hidden group'>
                                    <img src={p.img} alt="product-img" />
                                    <div className='absolute top-2 -right-full transition-all duration-300 group-hover:right-2'>
                                        <div className='flex flex-col gap-3'>
                                            <FaShoppingCart className='text-accent transition-colors duration-200 hover:text-secondary' size={20} />
                                            <CiHeart className='text-accent transition-colors duration-200 hover:text-secondary' size={25} />
                                        </div>

                                    </div>
                                    <ProductDetailsDialog />
                                </div>

                                <div className='pt-2.5 text-start'>
                                    <p className='text-accent cursor-pointer font-bold text-xs transition-colors duration-200 hover:text-secondary'>{p.name}</p>
                                    <span className='text-primary text-xs font-bold'>${p.price}</span>
                                </div>

                            </div>

                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
