"use client"
import { CiHeart } from "react-icons/ci";
import SecondartBtn from "../../ui/secondary-btn/SecondartBtn";
import Sizes from "./Sizes";
import Colors from "./Colors";
import Quantity from "./Quantity";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";
import { addToCart } from "@/RTK/slices/cartSlice";
export default function ProductInfo({ uniqueProduct, product, setSelectedColor, setSelectedMainImage, selectedColor, selectedSize, setSelectedSize, selectedSizeId, setSelectedSizeId, quantity, setQuantity, mainImage }) {
    const sizeColors = product.colors.filter(c => c.sizeId === selectedSizeId)

    const dispatch = useDispatch()
    const { user } = useUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const handelAddToCart = () => {
        if (!userEmail) {
            return Swal.fire("Please Login First")
        }
        if (!selectedColor || !selectedSize) {
            return Swal.fire("Choose Color and Size to Continue")
        }
        dispatch(addToCart({
            userEmail,
            product: uniqueProduct,
            name: uniqueProduct.name,
            price: uniqueProduct.newPrice,
            quantity: quantity,
            colorImage: mainImage,
            colorValue: selectedColor,
            size: selectedSize
        }))
        setQuantity(1)
        setSelectedSize(null)
        setSelectedColor(null)
    }
    return (
        <div className="space-y-4">
            {/* General Info */}
            <h1 className="text-2xl text-secondary font-bold">{uniqueProduct.name}</h1>
            <div className="flex items-center gap-4">
                <p className="text-accent font-bold">${uniqueProduct.newPrice}</p>
                <p className="text-primary line-through">${uniqueProduct.oldPrice}</p>
            </div>
            <p className="text-sm text-accent leading-loose">{uniqueProduct.description}</p>

            {/* Sizes */}
            <Sizes uniqueProduct={uniqueProduct} selectedSize={selectedSize} setSelectedSize={setSelectedSize} setSelectedSizeId={setSelectedSizeId} />

            {/* Colors */}
            <Colors selectedColor={selectedColor} selectedSizeId={selectedSizeId} setSelectedColor={setSelectedColor} setSelectedMainImage={setSelectedMainImage} sizeColors={sizeColors} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                {/* Add to cart btn */}
                <div className="min-w-[100px]" onClick={handelAddToCart}>
                    <SecondartBtn title={"add to cart"} className={"h-[50px] w-full rounded-[3px]"} />
                </div>
            </div>

            {/* Whislist Btn */}
            <div className="mt-5">
                <div className="text-sm text-accent flex items-center gap-1 cursor-pointer transition-colors duration-200 hover:text-secondary">
                    <span><CiHeart size={20} /></span>
                    <span>Add To Wish List</span>
                </div>
            </div>


        </div>
    )
}
