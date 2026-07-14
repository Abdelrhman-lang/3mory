"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { getUserOrderItems } from "@/services/orders/getUserOrderItems";
import { useEffect, useState } from "react";
import { OrderItemCard } from "./OrderItemCard";
import { getUser } from "@/services/user/getUser";

export function OrderDetailsDialog({ order }) {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fetchOrderItems = async () => {
    if (!order?.id || orderItems?.length > 0) return;

    setLoading(true);
    try {
      const res = await getUserOrderItems(order.id);
      if (res) {
        setOrderItems(res);
      }
    } catch (error) {
      console.error("Error Fetching Order Items", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      fetchOrderItems();
    }
  }, [order?.id, open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-200 h-3/4 overflow-y-scroll md:h-auto md:overflow-hidden">
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            Order <span className="font-bold">#{order.id}</span> Details
          </DialogTitle>
          <DialogDescription className={"text-center"}>
            Here You Can View The Order Details
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner className={"size-10"} />
          </div>
        ) : (
          <div className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderItems.map((order) => {
                return <OrderItemCard key={order.id} item={order} />;
              })}
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Order Notes</h3>
              <p className="inline-flex items-center px-2 py-0.5 rounded-md text-sm font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {order?.note}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
