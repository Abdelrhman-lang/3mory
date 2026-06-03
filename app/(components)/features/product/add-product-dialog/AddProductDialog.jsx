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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/lib/toast";
import { addProduct } from "@/services/products/add/addProduct";
import axios from "axios";
import { useState } from "react";

export function AddProductDialog({ setProduct }) {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: null,
    brand: "",
    category: "",
    newPrice: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const uplaodImage = async () => {
    const fd = new FormData();
    fd.append("file", productData.image);

    const res = await axios.post("/api/cloudinary-upload-image", fd);
    if (res.data.error) {
      throw new Error(res.data.error);
    }

    return res.data.url;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productData.name ||
      !productData.description ||
      !productData.brand ||
      !productData.category ||
      !productData.image ||
      !productData.newPrice
    )
      return showToast("error", "Please Fill all Fields To Add Product");
    setLoading(true);
    try {
      const imageUrl = await uplaodImage();
      const res = await addProduct(productData, imageUrl);
      if (res?.success) {
        showToast("success", res?.message);
        setProductData({
          name: "",
          brand: "",
          category: "",
          description: "",
          image: null,
          newPrice: "",
          quantity: 1,
        });
        setProduct((prev) => [...prev, res?.result]);
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
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 h-3/4 py-5! overflow-y-scroll">
        <form>
          <DialogHeader className={"pb-5"}>
            <DialogTitle className={"text-center"}>Add Product</DialogTitle>
            <DialogDescription className={"text-center"}>
              Add Product to your Inventory. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Product Description</Label>
              <Input
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="brand">Product Brand</Label>
              <Input
                id="brand"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="handbag">Handbag</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="newPrice">Product Price</Label>
              <Input
                id="newPrice"
                name="newPrice"
                value={productData.newPrice}
                onChange={handleInputChange}
                type={"number"}
              />
            </Field>
            <Field>
              <Label htmlFor="quantity">Product Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                type={"number"}
              />
            </Field>
            <Field>
              <Label htmlFor="image">Product Image</Label>
              <Input
                type={"file"}
                id="image"
                name="image"
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
            </Field>
          </FieldGroup>
          <DialogFooter className={"pt-5"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Adding......" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
