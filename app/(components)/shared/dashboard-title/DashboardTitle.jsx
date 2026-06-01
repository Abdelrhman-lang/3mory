import React from "react";

export default function DashboardTitle({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 capitalize">{title}</h1>
      <p className="text-sm text-gray-500 capitalize">{description}</p>
    </div>
  );
}
