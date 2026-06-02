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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showToast } from "@/lib/toast";
import { deleteColor } from "@/services/colors/delete/deleteColor";
import { updateColor } from "@/services/colors/update/updateColor";
import { Pencil } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export function EditColorDialog({ color, productId, sizeId, setProducts }) {
  const [colorData, setColorData] = useState({
    name: color.colorName || "",
    quantity: color.colorQuantity || "",
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setColorData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateColor(color.id, colorData);
      if (res?.success) {
        showToast("success", res?.message);
        if (setProducts) {
          setProducts((prevProducts) =>
            prevProducts.map((p) => {
              if (p.id !== productId) return p; // مش ده المنتج المطلوب؟ سيبه زي ما هو

              return {
                ...p,
                sizes: p.sizes?.map((s) => {
                  if (s.id !== sizeId) return s; // مش ده المقاس المطلوب؟ سيبه زي ما هو

                  return {
                    ...s,
                    colors: s.colors?.map((c) =>
                      c.id === color.id
                        ? {
                            ...c,
                            colorName: colorData.name,
                            colorQuantity: Number(colorData.quantity),
                          }
                        : c,
                    ),
                  };
                }),
              };
            }),
          );
        } else {
          showToast("error", res?.message);
        }
      }
    } catch (error) {
      showToast("error", error?.message);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Edit {color.colorName} Color
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              Make changes to your product here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Color Name</Label>
              <Input
                id="name"
                name="name"
                value={colorData.name}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type={"number"}
                id="quantity"
                name="quantity"
                value={colorData.quantity}
                onChange={handelInputChange}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handelSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
