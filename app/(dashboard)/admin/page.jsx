import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the admin dashboard. Here you can manage products, orders,
          and users.
        </p>
      </div>
    </div>
  );
}
