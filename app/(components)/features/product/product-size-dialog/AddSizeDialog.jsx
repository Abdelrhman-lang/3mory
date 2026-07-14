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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/lib/toast";
import { addSize } from "@/services/sizes/add-size/addSize";
import { useState } from "react";
import Swal from "sweetalert2";
export function AddSizeDialog({ product, setProducts }) {
  const [size, setSize] = useState("select size");
  const handelSelectSize = (value) => {
    setSize(value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addSize(size, product.id);
      if (res?.success) {
        showToast("success", res?.message);
        if (setProducts) {
          setProducts((prevProducts) =>
            prevProducts.map((p) => {
              if (p.id !== product.id) return p;

              return {
                ...p,
                sizes: [...(p.sizes || []), res?.result],
              };
            }),
          );
        }
      } else {
        showToast("error", res?.message);
      }
    } catch (error) {
      console.error("Error adding size:", error);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Add Size
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Add Size for{" "}
              <span className="font-bold text-secondary">{product.name}</span>
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              Make changes to your product sizes here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <Select value={size} onValueChange={handelSelectSize}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-sm">Select Size</SelectLabel>
                <SelectItem value={"41"}>41</SelectItem>
                <SelectItem value={"42"}>42</SelectItem>
                <SelectItem value={"43"}>43</SelectItem>
                <SelectItem value={"44"}>44</SelectItem>
                <SelectItem value={"45"}>45</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handelSubmit}>
              Save changes
            </Button>
            {/* <Button onClick={() => console.log(size)}>Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
