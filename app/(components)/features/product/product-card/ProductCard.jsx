
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ProductDetailsDialog } from "../product-details-dialog/ProductDetailsDialog";
import Link from "next/link";

export default function ProductCard({ product }) {

    return (
        <div>
            <div className='relative cursor-pointer overflow-hidden group'>
                <Link href={`/product/${product.id}`}>
                    <img src={product.image} alt="product-img" className="bg-[#acacaa] h-[329px] w-full" />
                </Link>
                <div className='absolute top-2 -right-full transition-all duration-300 group-hover:right-2'>
                    <div className='flex flex-col gap-3'>
                        <FaShoppingCart className='text-accent transition-colors duration-200 hover:text-secondary' size={20} />
                        <CiHeart className='text-accent transition-colors duration-200 hover:text-secondary' size={25} onClick={() => console.log(product)} />
                    </div>

                </div>
                <ProductDetailsDialog product={product} />
            </div>

            <div className='pt-2.5 text-start'>
                <Link href={`/product/${product.id}`}><p className='text-accent cursor-pointer font-bold text-xs transition-colors duration-200 hover:text-secondary'>{product.name}</p></Link>
                <div>
                    <span className='text-primary text-xs font-bold mr-2'>${product.newPrice}</span>
                    <span className='text-accent text-xs font-bold line-through'>${product.oldPrice}</span>
                </div>
            </div>

        </div>
    )
}
