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
import axios from "axios";
import { useState } from "react";

export function AddColorDialog({ sizeId, setProducts, productId }) {
  const [colorData, setColorData] = useState({
    name: "",
    quantity: 1,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const uplaodImage = async () => {
    const fd = new FormData();
    fd.append("file", colorData.image);

    const res = await axios.post("/api/cloudinary-upload-image", fd);
    if (res.data.error) {
      throw new Error(res.data.error);
    }

    return res.data.url;
  };
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setColorData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!colorData.name || !colorData.image)
      return showToast("error", "Please Fill all Fields To Add Color");

    setLoading(true);
    try {
      const imageUrl = await uplaodImage();
      const res = await addColor(colorData, sizeId, imageUrl);
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
          image: null,
          quantity: 1,
        });
      } else {
        showToast("error", res?.message);
      }
    } catch (error) {
      showToast("error", error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Color</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150">
        <form onSubmit={handelSubmit}>
          <DialogHeader>
            <DialogTitle className={"text-center"}>Add New Color</DialogTitle>
            <DialogDescription className={"text-center"}>
              Make changes to your product here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className={"mt-5"}>
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
                type={"file"}
                id="image"
                name="image"
                onChange={(e) =>
                  setColorData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
            </Field>
          </FieldGroup>
          <DialogFooter className={"mt-5"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Color"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
