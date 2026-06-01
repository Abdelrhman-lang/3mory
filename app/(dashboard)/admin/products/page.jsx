"use client";
import DashboardTitle from "@/app/(components)/shared/dashboard-title/DashboardTitle";
import { DialogDemo } from "@/app/(components)/ui/dialog/DialogDemo";
import { Spinner } from "@/components/ui/spinner";
import { getProducts } from "@/services/products/getProducts";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        if (res) {
          setProducts(res);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const stockStatus = (quantity) => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= 5) return "low Stock";
    return "In Stock";
  };
  const stockColor = (stock) => {
    switch (stock) {
      case "In Stock":
        return "text-green-500";
      case "low Stock":
        return "text-yellow-500";
      case "Out of Stock":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <DashboardTitle
        title={"products mangment"}
        description={"manage your products here"}
      />
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner className={"size-14"} />
        </div>
      ) : products?.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
                  <th className="p-4 w-20">ID</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Product Image</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Details</th>
                  <th className="p-4 ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-900">
                      #{product.id}
                    </td>
                    {/* الاسم */}
                    <td className="p-4 font-semibold text-gray-900">
                      {product.name}
                    </td>
                    {/* الصورة */}
                    <td className="p-4 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="text-gray-400" size={20} />
                        )}
                      </div>
                    </td>

                    {/* القسم */}
                    <td className="p-4 text-gray-500">{product.category}</td>

                    {/* السعر */}
                    <td className="p-4 font-bold text-emerald-600">
                      ${product.newPrice}
                    </td>

                    {/* التفاصيل */}
                    <td className="p-4 text-gray-500">
                      <DialogDemo product={product} />
                    </td>

                    {/* أزرار التحكم */}
                    <td className="p-4 flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Product"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
      <button onClick={() => console.log(availableColors)}>get colors</button>
      <button onClick={() => console.log(products)}>get products</button>
    </div>
  );
}
