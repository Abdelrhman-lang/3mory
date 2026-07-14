"use client";

import Overlay from "../../shared/overlay/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  closeCart,
  deleteItemFromCart,
  getCartItems,
} from "@/RTK/slices/cartSlice";
import CartHeader from "./cart-header/CartHeader";
import CartItems from "./cart-items/CartItems";
import CartPrices from "./cart-prices/CartPrices";
import CartBtns from "./cart-btns/CartBtns";
import { Spinner } from "@/components/ui/spinner";
import Swal from "sweetalert2";

export default function Cart({ className }) {
  const dispatch = useDispatch();
  const { items, isOpen, totalPrice, loading } = useSelector(
    (state) => state.cart,
  );
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  useEffect(() => {
    if (userEmail) {
      dispatch(getCartItems({ userEmail }));
    }
  }, [userEmail]);
  const vat = 10;
  const handleDeleteItemFromCart = async (itemId, userEmail) => {
    try {
      await dispatch(deleteItemFromCart({ itemId, userEmail })).unwrap();
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Item removed from cart successfully.",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
      });
    } catch (err) {
      console.error("DELETE_ITEM_FROM_CART_ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.error || "Failed to delete item from cart",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
      });
    }
  };
  return (
    <>
      <Overlay prop={isOpen} fn={() => dispatch(closeCart())} />
      <div
        className={`overflow-y-scroll fixed top-0 ${isOpen ? "right-0" : "-right-full"} transition-all duration-500 w-3/4 md:w-[400px] h-full bg-white shadow-md z-40 pt-10 px-3 md:px-7`}
      >
        <CartHeader fn={() => dispatch(closeCart())} />
        <CartItems
          handleDeleteItemFromCart={handleDeleteItemFromCart}
          dispatch={dispatch}
          userEmail={userEmail}
          items={items}
        />
        {items?.length > 0 ? (
          loading ? (
            <div className="flex items-center justify-center">
              <Spinner className={"size-6"} />
            </div>
          ) : (
            <>
              <CartPrices totalPrice={totalPrice} vat={vat} />
              <CartBtns />
            </>
          )
        ) : (
          <div className="flex items-center justify-center min-h-1/2">
            <p className="capitalize text-sm text-center md:text-lg">
              Your Cart is Empty add some products
            </p>
          </div>
        )}
      </div>
    </>
  );
}
