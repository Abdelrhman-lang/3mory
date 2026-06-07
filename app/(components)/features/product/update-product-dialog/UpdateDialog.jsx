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
import { Pencil } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProduct } from "@/services/products/update/updateProduct";
import Swal from "sweetalert2";
import { getProducts } from "@/services/products/getProductsForPagination";
export function UpdateDialog({ product, setProducts }) {
  const [productData, setProductData] = useState({
    name: product.name,
    category: product.category,
    price: product.newPrice,
  });

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(product.id, productData);
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          timer: 1500,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? res?.result[0] : p)),
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className={
              "p-2 text-gray-500 bg-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            }
            title="Update Product"
          >
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Update {product.name}
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              Make changes to your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={productData.name}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="price">Product Price</Label>
              <Input
                id="price"
                name="price"
                value={productData.price}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="category">Product Category</Label>
              <Select
                value={productData.category}
                onValueChange={(value) =>
                  setProductData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Handbag">Handbag</SelectItem>
                    <SelectItem value="Shoes">Shoes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
