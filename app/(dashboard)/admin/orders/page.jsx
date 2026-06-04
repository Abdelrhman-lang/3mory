"use client";
import DashboardTitle from "@/app/(components)/shared/dashboard-title/DashboardTitle";
import { Spinner } from "@/components/ui/spinner";
import {
  getOrders,
  updateOrderStatus,
} from "@/services/dashboard-actions/orders/orders";
import { RefreshCw } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import Swal from "sweetalert2";
import { OrderDetailsDialog } from "./order-details-dialog/OrderDetailsDialog";

export default function page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      if (res?.success) {
        setOrders(res.orders);
      } else {
        console.error("Failed to fetch orders:", res?.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handelStatusChange = (orderId, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return;

    startTransition(async () => {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res?.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: res?.message,
          timer: 2500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        Swal.fire(
          "Oops!",
          res?.error || "Failed to update order status. Please try again.",
          "error",
        );
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardTitle
          title={"orders management"}
          description={"Track and manage your store's orders."}
        />
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner className={"size-14"} />
        </div>
      ) : orders?.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-medium">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Email</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Note</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Actions</th>
                  <th className="p-4 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-900">
                      #{order.id}
                    </td>
                    <td className="p-4 text-gray-600">{order.userEmail}</td>
                    <td className="p-4 font-medium text-red-500">
                      ${order.totalPrice}
                    </td>
                    <td className="p-4 font-semibold text-slate-900">
                      {order.note}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4 ">
                      {/* Dropdown أو Select لتغيير الحالة فوراً */}
                      <select
                        disabled={isPending}
                        value={order.status}
                        onChange={(e) =>
                          handelStatusChange(
                            order.id,
                            order.status,
                            e.target.value,
                          )
                        }
                        className="bg-gray-50 border border-gray-200 rounded-lg text-xs p-2 focus:ring-1 focus:ring-emerald-500 outline-none disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <OrderDetailsDialog order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 shadow-sm">
          No orders found yet.
        </div>
      )}
    </div>
  );
}
