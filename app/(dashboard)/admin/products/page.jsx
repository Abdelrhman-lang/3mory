"use client";
import { AddProductDialog } from "@/app/(components)/features/product/add-product-dialog/AddProductDialog";
import { UpdateDialog } from "@/app/(components)/features/product/update-product-dialog/UpdateDialog";
import DashboardTitle from "@/app/(components)/shared/dashboard-title/DashboardTitle";
import { DetailsDemo } from "@/app/(components)/ui/dialog/DetailsDemo";

import { Spinner } from "@/components/ui/spinner";
import { deleteProduct } from "@/services/products/delete/deleteProduct";
import { getProducts } from "@/services/products/getProducts";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

  const handelDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you will delete this product with all colors and sizes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(productId);
          if (res?.success) {
            Swal.fire({
              icon: "success",
              title: res?.message,
              timer: 1500,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
            });
            setProducts((prev) => prev.filter((p) => p.id !== productId));
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete product",
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardTitle
          title={"products mangment"}
          description={"manage your products here"}
        />
        <AddProductDialog setProduct={setProducts} />
      </div>
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
                    <td className="p-4 text-gray-500 capitalize">
                      {product.category}
                    </td>

                    {/* السعر */}
                    <td className="p-4 font-bold text-emerald-600">
                      ${product.newPrice}
                    </td>

                    {/* التفاصيل */}
                    <td className="p-4 text-gray-500">
                      <DetailsDemo
                        product={product}
                        setProducts={setProducts}
                      />
                    </td>

                    {/* أزرار التحكم */}
                    <td className="p-4 flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <UpdateDialog
                          product={product}
                          setProducts={setProducts}
                        />
                        <button
                          onClick={() => handelDelete(product.id)}
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
    </div>
  );
}
