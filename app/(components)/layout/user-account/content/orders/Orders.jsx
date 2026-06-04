"use client";
import { useState } from "react";
import OrdersItems from "./OrdersItems";
const tableHeads = [
  { id: 1, title: "order id" },
  { id: 2, title: "date" },
  { id: 3, title: "status" },
  { id: 4, title: "total" },
  { id: 5, title: "actions" },
];
const tdStyle = "p-2.5 border-r";
const centerItems = "flex items-center justify-center";
const textStyle = "text-accent text-sm font-semibold";
export default function Orders({ userOrders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  if (selectedOrderId) {
    return (
      <OrdersItems
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "delivered":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-accent";
    }
  };
  return (
    <div className="w-full">
      <div className="overflow-x-scroll xl:overflow-x-hidden">
        {userOrders?.length > 0 ? (
          <table className="w-full min-w-200">
            <thead className="border bg-[#f2f2f2]">
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
            </thead>
            <tbody>
              {userOrders?.map((order) => {
                return (
                  <tr key={order.id} className="border-b border-l text-center">
                    {/* ID */}
                    <td className={tdStyle}>
                      <div className={centerItems}>
                        <p className={textStyle}>{order?.id}</p>
                      </div>
                    </td>
                    {/* Date */}
                    <td className={tdStyle}>
                      <div className={centerItems}>
                        <p className={textStyle}>
                          {order?.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                    </td>
                    {/* Status */}
                    <td className={tdStyle}>
                      <div className={centerItems}>
                        <p
                          className={`text-sm font-semibold ${statusColor(order?.status)} capitalize`}
                        >
                          {order?.status}
                        </p>
                      </div>
                    </td>
                    {/* Total */}
                    <td className={tdStyle}>
                      <div className={centerItems}>
                        <p className={textStyle}>{order?.totalPrice}</p>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className={tdStyle}>
                      <div className={centerItems}>
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className={`${textStyle} text-secondary capitalize cursor-pointer`}
                        >
                          view
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-45 text-muted-foreground text-2xl capitalize">
            there are no orders
          </div>
        )}
      </div>
    </div>
  );
}
