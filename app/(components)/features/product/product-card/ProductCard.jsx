import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ProductDetailsDialog } from "../product-details-dialog/ProductDetailsDialog";


export default function ProductCard({ product }) {
    return (
        <div>
            <div className='relative cursor-pointer overflow-hidden group'>
                <img src={product.img} alt="product-img" />
                <div className='absolute top-2 -right-full transition-all duration-300 group-hover:right-2'>
                    <div className='flex flex-col gap-3'>
                        <FaShoppingCart className='text-accent transition-colors duration-200 hover:text-secondary' size={20} />
                        <CiHeart className='text-accent transition-colors duration-200 hover:text-secondary' size={25} />
                    </div>

                </div>
                <ProductDetailsDialog />
            </div>

            <div className='pt-2.5 text-start'>
                <p className='text-accent cursor-pointer font-bold text-xs transition-colors duration-200 hover:text-secondary'>{product.name}</p>
                <span className='text-primary text-xs font-bold'>${product.price}</span>
            </div>

        </div>
    )
}
