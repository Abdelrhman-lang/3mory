"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import ProductDetailsDialogImgs from "./ProductDetailsDialogImgs"
import { useEffect, useState } from "react"

import Size from "./Size";
import Color from "./Color";
import Quantity from "./Quantity";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";
import { addToCart } from "@/RTK/slices/cartSlice";


export function ProductDetailsDialog({ product }) {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedMainImg, setSelectedMainImg] = useState(product.image)
    const [selectedImage, setSelectedImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const { user } = useUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const handelAddToCart = () => {
        if (!userEmail) {
            return Swal.fire("Please login first");
        }

        dispatch(addToCart({
            userEmail,
            product,
            name: product.name,
            price: product.newPrice,
            quantity: quantity,
            colorImage: selectedImage.colorImage,
            colorValue: selectedImage.colorName,
            size: selectedSize.sizeValue
        }))
        setSelectedSize(null)
        setSelectedImage(null)
        setQuantity(1)
    }
    useEffect(() => {
        if (selectedSize) {
            const firstColorForSize = product.sizes.find(s => s.id === selectedSize.id)?.colors?.[0];
            if (firstColorForSize?.colorImage) {
                setSelectedMainImg(firstColorForSize.colorImage);
            }
        }
    }, [selectedSize, product.sizes, setSelectedMainImg]);
    // // All Product colors
    const allProductsColors = [...new Map(product?.sizes?.flatMap(s => s.colors).map(c => [c.colorName, c])).values()];


    // colors depend on selected size
    const currentColors = selectedSize ? product.sizes.find(s => s.id === selectedSize.id)?.colors || [] : []
    return (
        <Dialog className={"overflow-y-scroll"}>
            <form>
                <DialogTrigger asChild>
                    <div className='absolute left-0 -bottom-full capitalize text-sm bg-secondary text-center text-white w-full py-2 transition-all duration-300 group-hover:bottom-0'>
                        quick view
                    </div>
                </DialogTrigger>

                <DialogContent className="max-w-[90vw] md:max-w-[700px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader className={"text-center text-accent text-xs font-bold"}>Product #{product.id} Details</DialogHeader>
                    <div className="py-2 px-3">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            <ProductDetailsDialogImgs productImg={selectedMainImg} />
                            <div className="md:col-span-7 lg:col-span-8">
                                <div className="flex flex-col gap-3.5 text-[16px]">
                                    <h4 className="uppercase font-semibold">{product.name}</h4>
                                    <p className="text-secondary font-medium">${product.newPrice}</p>
                                    <DialogDescription className={"text-accent text-sm leading-[1.6]"}>
                                        {product.description}
                                    </DialogDescription>
                                    <Size product={product} setSelectedSize={setSelectedSize} selectedSize={selectedSize} />
                                    <Color allProductsColors={allProductsColors} currentColors={currentColors} selectedSize={selectedSize} setSelectedMainImg={setSelectedMainImg} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
                                    <div className="flex items-center justify-start gap-4 mt-5">
                                        <Quantity quantity={quantity} setQuantity={setQuantity} />

                                        <button onClick={handelAddToCart} className="bg-primary cursor-pointer h-[45px] w-[230px] text-white text-xs font-medium transition-colors duration-200 hover:bg-secondary">ADD TO CART</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </DialogContent>

            </form>
        </Dialog >
    )
}
