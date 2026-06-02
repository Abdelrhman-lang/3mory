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
import { addColor } from "@/services/colors/add/addColor";
import { useState } from "react";

export function AddColorDialog({ sizeId, setProducts, productId }) {
  const [colorData, setColorData] = useState({
    name: "",
    quantity: 1,
    image: "",
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setColorData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addColor(colorData, sizeId);
      if (res?.success) {
        showToast("success", res?.message);
        setProducts((prevProducts) =>
          prevProducts.map((p) => {
            if (p.id !== productId) return p;

            return {
              ...p,
              sizes: p.sizes?.map((s) => {
                if (s.id !== sizeId) return s;

                return {
                  ...s,
                  colors: [...(s.colors || []), res?.result],
                };
              }),
            };
          }),
        );
        setColorData({
          name: "",
          image: "",
        });
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
          <Button variant="outline">Add Color</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>Add New Color</DialogTitle>
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
                value={colorData.name.toLowerCase()}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                value={colorData.quantity}
                onChange={handelInputChange}
                type={"number"}
              />
            </Field>
            <Field>
              <Label htmlFor="image">Color Image</Label>
              <Input
                id="image"
                name="image"
                value={colorData.image}
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
