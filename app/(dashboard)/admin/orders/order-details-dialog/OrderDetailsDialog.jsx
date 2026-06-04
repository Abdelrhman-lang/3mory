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
import UserDetailsTable from "./UserDetailsTable";
export function OrderDetailsDialog({ order }) {
  const [orderItems, setOrderItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
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
  const fetchUserDetails = async () => {
    if (!order?.userEmail) return;
    setLoading(true);
    try {
      const res = await getUser(order?.userEmail);
      if (res) {
        setUserDetails(res);
      }
    } catch (error) {
      console.error("Error Fetching UserDetails", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      fetchOrderItems();
    }
  }, [order?.id, open]);

  useEffect(() => {
    if (open) {
      fetchUserDetails();
    }
  }, [open, order?.userEmail]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-200">
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

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-Primary">
                User Details
              </h2>
              <UserDetailsTable userDetails={userDetails} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
