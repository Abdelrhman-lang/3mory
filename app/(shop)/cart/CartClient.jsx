"use client";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { deleteItemFromCart, getCartItems } from "@/RTK/slices/cartSlice";
import { useUser } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import BreadcrumbBasic from "@/app/(components)/shared/breadcrumb/BreadcrumbBasic";
const tableHeads = [
  { id: 1, title: "delete" },
  { id: 2, title: "image" },
  { id: 3, title: "name" },
  { id: 4, title: "color" },
  { id: 5, title: "size" },
  { id: 6, title: "price" },
  { id: 7, title: "quantity" },
  { id: 8, title: "total" },
];

const tdStyle = "p-2.5 border-r";
const centerItems = "flex items-center justify-center";
const textStyle = "text-accent text-sm font-semibold";
export default function CartClient() {
  const { items, totalPrice, loading } = useSelector((state) => state.cart);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userEmail) {
      dispatch(getCartItems({ userEmail }));
    }
  }, [dispatch, userEmail]);
  const shipping = 50;

  if (loading) {
    return (
      <section className="fixed inset-0 bg-white z-50 flex items-center justify-center w-screen h-screen">
        <Spinner className={"size-14"} />
      </section>
    );
  }
  return (
    <section className="w-fuull overflow-hidden">
      <div className="custom-container">
        <BreadcrumbBasic page="Cart" />

        {items.length > 0 ? (
          <div className="mt-12 w-full">
            <div className="overflow-x-scroll xl:overflow-hidden">
              <table className="w-full min-w-[1000px]">
                <thead className="border bg-[#f2f2f2]">
                  <tr className="border">
                    {tableHeads.map((tb) => {
                      return (
                        <th
                          key={tb.id}
                          className="border-b-4 border-b-secondary text-accent font-semibold uppercase p-2.5 text-center"
                        >
                          {tb.title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="">
                  {items.map((item) => {
                    return (
                      <tr
                        className="border-b border-l text-center"
                        key={item.id}
                      >
                        {/* Delete */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <FaRegTrashAlt
                              size={20}
                              className="text-red-500 cursor-pointer"
                              onClick={() =>
                                dispatch(
                                  deleteItemFromCart({
                                    itemId: item.id,
                                    userEmail,
                                  }),
                                )
                              }
                            />
                          </div>
                        </td>

                        {/* Image */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <Image
                              src={item.colorImage}
                              alt={item.name}
                              width={85}
                              height={95}
                              className="object-cover"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className={textStyle}>{item.name}</p>
                          </div>
                        </td>

                        {/* Color */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className={textStyle}>{item.colorValue}</p>
                          </div>
                        </td>
                        {/* Size */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className={textStyle}>{item.size}</p>
                          </div>
                        </td>

                        {/* Price */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className="text-secondary text-lg font-semibold">
                              ${item.price}
                            </p>
                          </div>
                        </td>
                        {/* Quantity */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className={textStyle}>{item.quantity}</p>
                          </div>
                        </td>
                        {/* Total Item Price */}
                        <td className={tdStyle}>
                          <div className={centerItems}>
                            <p className="text-secondary text-lg font-semibold">
                              ${item.quantity * item.price}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-span-7"></div>
                <div className="col-span-5">
                  <div className="border">
                    <div className="px-4 py-1 bg-primary uppercase text-white font-bold text-lg">
                      cart total
                    </div>
                    <div className="pt-2.5 pb-5 px-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-primary capitalize font-semibold">
                          subtotal:
                        </p>
                        <p className="text-lg text-primary font-bold">
                          ${totalPrice}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pb-5">
                        <p className="text-sm text-primary capitalize font-semibold">
                          shipping:
                        </p>
                        <p className="text-lg text-primary font-bold">
                          ${shipping}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-primary font-semibold capitalize">
                            total
                          </p>
                          <p className="text-lg text-primary font-bold">
                            ${totalPrice + shipping}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-2xl text-primary font-semibold capitalize">
              your cart is empty add some products
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
