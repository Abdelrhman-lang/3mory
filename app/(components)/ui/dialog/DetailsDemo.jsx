"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddSizeDialog } from "../../features/product/product-size-dialog/AddSizeDialog";
import { ColorsForProductDialog } from "../../features/product/product-color-dialog/ColorsForProductDialog";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { showToast } from "@/lib/toast";
import { deleteSize } from "@/services/sizes/delete-size/deleteSize";

export function DetailsDemo({ product, setProducts }) {
  const handelDeleteSize = async (sizeId) => {
    try {
      const res = await deleteSize(sizeId);
      if (res?.success) {
        showToast("success", res?.message);
        if (setProducts) {
          setProducts((prevProducts) =>
            prevProducts.map((p) => {
              if (p.id !== product.id) return p;

              return {
                ...p,
                sizes: p?.sizes?.filter((s) => s.id !== Number(sizeId)),
              };
            }),
          );
        }
      } else {
        showToast("error", res?.message);
      }
    } catch (error) {
      showToast("error", error?.message);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>{product.name}</DialogTitle>
            <DialogDescription className={"text-center text-sm text-secondary"}>
              Here You can show more details about the product, like sizes and
              colors
            </DialogDescription>
          </DialogHeader>
          {product?.sizes?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sizes</TableHead>
                  <TableHead>Available Colors</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.sizes?.map((size) => {
                  return (
                    <TableRow key={size.id}>
                      <TableCell>{size.sizeValue}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-3">
                          {size.colors && size.colors.length > 0 ? (
                            size.colors.map((color) => (
                              <div
                                key={color.id}
                                className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md shadow-sm"
                              >
                                <img
                                  src={color.colorImage}
                                  alt={color.colorName}
                                  className="w-5 h-5 rounded object-cover border border-slate-300"
                                />

                                <span className="text-xs font-medium text-slate-800 capitalize">
                                  {color.colorName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({color?.colorQuantity} in stock)
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground italic">
                              No colors available
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={"flex items-center gap-2"}>
                        <ColorsForProductDialog
                          product={product}
                          sizeValue={size.sizeValue}
                          size={size}
                          setProducts={setProducts}
                        />
                        <Button
                          variant="outline"
                          className={
                            "hover:text-red-400 bg-gray-100 text-gray-600"
                          }
                          onClick={() => handelDeleteSize(size.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center text-muted-foreground text-lg capitalize">
              there are no sizes for this product
            </div>
          )}

          <div className="flex items-center justify-end">
            <AddSizeDialog product={product} setProducts={setProducts} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
