"use client"
import { deleteFromWishlist } from "@/services/wishlist/delete/deleteFromWishlist";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const tableHeads = [
    { id: 1, title: "delete" },
    { id: 2, title: "image" },
    { id: 3, title: "product" },
    { id: 4, title: "price" },
    { id: 5, title: "stock status" },
    { id: 7, title: "view" },
]
const tdStyle = "p-2.5 border-r"
const centerItems = "flex items-center justify-center"
const textStyle = "text-accent text-sm font-semibold"
export default function Wishlist({ wishlistItems, setWishlistItems }) {
    const handelDeleteFromWishlist = async (id)=> {
        try {
            const result = await deleteFromWishlist(id)
            if(result?.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item deleted from wishlist!",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                })
                setWishlistItems((prev)=> prev.filter((item)=> item.id !== id))
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: result?.error || "Could not delete the item.",
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "An unexpected error occurred.",
            })
        }
    }
    return (
        <div className="w-full">
            <div className="overflow-x-scroll xl:overflow-x-hidden">
                {wishlistItems && wishlistItems.length > 0 ? (
                    <table className="w-full min-w-[800px]">
                    <thead className="border bg-[#f2f2f2]">
                        {tableHeads.map((tb) => {
                            return (
                                <th key={tb.id} className="border-b-4 border-b-secondary text-accent font-semibold uppercase p-2.5 text-center">
                                    {tb.title}
                                </th>
                            )
                        })}
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => {
                            return <tr key={item.id} className="border-b border-l text-center">
                                {/* Delete */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <button>
                                            <FaTrash size={20} className="text-red-500 cursor-pointer" onClick={() => handelDeleteFromWishlist(item.id)} />
                                        </button>
                                    </div>
                                </td>
                                {/* image */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <Image src={item?.image} alt="product-image" width={90} height={85} className="object-cover" />
                                    </div>
                                </td>
                                {/* Name */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <p className={textStyle}>
                                            {item?.productName}
                                        </p>
                                    </div>
                                </td>
                                {/* Price */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <p className={textStyle}>
                                            ${item?.price}
                                        </p>
                                    </div>
                                </td>
                                {/* Stock */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <p className={`${textStyle} text-green-500!`}>
                                            {item?.quantity > 1 ? "In Stock" : ""}
                                        </p>
                                    </div>
                                </td>

                                {/* View */}
                                <td className={tdStyle}>
                                    <div className={centerItems}>
                                        <Link href={`/product/${item?.productId}`} className="capitalize text-secondary font-semibold text-sm">view</Link>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <p className="text-gray-500 text-lg">Your wishlist is currently empty.</p>
                        <Link href="/shop" className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition">Continue Shopping</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
