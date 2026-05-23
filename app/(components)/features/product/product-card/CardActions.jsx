"use client"
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Swal from "sweetalert2";
import { createWishlist } from "@/services/wishlist/create/createWishlist";
import { useUser } from "@clerk/nextjs";

export default function CardActions({ productId, productImage, productName, productPrice, productQuantity }) {
    const { user } = useUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress
    const handelAddToWishlist = async () => {
        try {
            if (!userEmail) {
                Swal.fire("Please Login To Add Product To Wishlist")
                return
            }
            const res = await createWishlist(userEmail, productId, productImage, productName, productPrice, productQuantity)
            if (res) {
                Swal.fire({
                    position: "top-end",
                    timer: 1500,
                    toast: true,
                    showConfirmButton: false,
                    text: "Added To Wishlist",
                    icon: "success"
                })
            }

        } catch (err) {
            console.error("faild while adding to wishlist: ", err)
        }
    }
    return (
        <div className='flex flex-col gap-3'>
            <FaShoppingCart className='text-accent transition-colors duration-200 hover:text-secondary' size={20} />
            <CiHeart className='text-accent transition-colors duration-200 hover:text-secondary' size={25} onClick={handelAddToWishlist} />
        </div>
    )
}
