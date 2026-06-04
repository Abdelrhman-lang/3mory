"use client";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getCartItems } from "@/RTK/slices/cartSlice";

import Swal from "sweetalert2";
import { placeOrder } from "@/services/orders/create/placeOrder";
import BreadcrumbBasic from "@/app/(components)/shared/breadcrumb/BreadcrumbBasic";
import CheckoutDetails from "@/app/(components)/ui/checkout/details/CheckoutDetails";
import CheckoutOrder from "@/app/(components)/ui/checkout/order-details/CheckoutOrder";
import { showToast } from "@/lib/toast";

export default function CheckoutClient({ user }) {
  const dispatch = useDispatch();
  const {
    items,
    totalPrice,
    loading: cartLoading,
  } = useSelector((state) => state.cart);
  const userEmail = user?.email;
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelPlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber || !formData?.address)
      return showToast(
        "error",
        "Please Add Phone Number and Address To Place Order",
      );
    setLoading(true);
    try {
      // Update user details
      const result = await placeOrder({
        userEmail: userEmail,
        items: items,
        totalPrice: totalPrice,
        note: formData.note,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Order Placed",
          text: "Your order has been placed successfully!",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
        dispatch(getCartItems({ userEmail }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: result?.error || "Failed to place order. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.message ||
          "An error occurred while placing your order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getCartItems({ userEmail }));
  }, [userEmail, dispatch]);

  const isCartEmpty = userEmail && !cartLoading && items?.length === 0;
  if (cartLoading && items?.length === 0) {
    return null;
  }
  return (
    <section>
      <div className="custom-container">
        <BreadcrumbBasic page="checkout" />

        {items?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <div>
              <CheckoutDetails
                user={user}
                formData={formData}
                setFormData={setFormData}
                handelInputChange={handelInputChange}
              />
            </div>
            <div>
              <CheckoutOrder
                items={items}
                totalPrice={totalPrice}
                handelPlaceOrder={handelPlaceOrder}
                loading={loading}
              />
            </div>
          </div>
        ) : null}

        {isCartEmpty && (
          <div className="flex items-center justify-center h-[50vh]">
            <h2 className="text-accent font-bold text-4xl md:text-6xl text-center">
              There are no items in your cart.
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
