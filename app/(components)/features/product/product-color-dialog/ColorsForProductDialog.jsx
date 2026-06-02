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

import { Pencil, X } from "lucide-react";
import { ColorDialog, EditColorDialog } from "./EditColorDialog";
import { AddColorDialog } from "./AddColorDialog";
import { deleteColor } from "@/services/colors/delete/deleteColor";
import Swal from "sweetalert2";
import { showToast } from "@/lib/toast";

export function ColorsForProductDialog({
  sizeValue,
  product,
  size,
  setProducts,
}) {
  const handelDeleteColor = (colorId) => {
    Swal.fire({
      customClass: {
        container: "z-[999999]",
      },
      didOpen: (toast) => {
        Swal.getContainer().style.pointerEvents = "none";
        toast.style.pointerEvents = "auto";
      },
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        try {
          const res = await deleteColor(colorId);
          if (res?.success) {
            showToast("success", res?.message);
            if (setProducts) {
              setProducts((prevProducts) =>
                prevProducts.map((p) => {
                  if (p.id !== product.id) return p;
                  return {
                    ...p,
                    sizes: p?.sizes?.map((s) => {
                      if (s.id !== size.id) return s;
                      return {
                        ...s,
                        colors: s?.colors?.filter(
                          (c) => c.id !== Number(colorId),
                        ),
                      };
                    }),
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
      }
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className={
              "bg-gray-100 text-gray-600 hover:text-gray-50 transition-colors"
            }
            title={`Edit Size ${sizeValue}`}
          >
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Edit Size{" "}
              <span className="font-bold text-secondary">{sizeValue}</span> for{" "}
              <span className="text-secondary font-bold">{product.name}</span>
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              Make changes to your product sizes and colors here. Click save
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between">
            <h3 className="text-lg">
              Size: <span className="text-lg text-secondary">{sizeValue}</span>
            </h3>
            <AddColorDialog
              sizeId={size.id}
              setProducts={setProducts}
              productId={product.id}
            />
          </div>
          {size?.colors?.length > 0 ? (
            <ul className="flex items-center gap-3 flex-wrap">
              {size?.colors?.map((color) => {
                return (
                  <li
                    key={color.id}
                    className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md shadow-sm"
                  >
                    <span className="capitalize">{color.colorName}</span>
                    <span className="text-[13px] text-muted-foreground">
                      ({color.colorQuantity} in Stock)
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handelDeleteColor(color.id)}
                    >
                      <X size={16} />
                    </Button>
                    <EditColorDialog
                      color={color}
                      productId={product.id}
                      setProducts={setProducts}
                      sizeId={size.id}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex items-center justify-center text-xl text-muted-foreground capitalize">
              no colors avilable
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
