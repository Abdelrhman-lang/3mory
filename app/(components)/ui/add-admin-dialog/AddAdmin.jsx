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
import { addAdmin } from "@/services/dashboard-actions/admins/addAdmin";
import { useState } from "react";

export function AddAdmin() {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!adminData.firstName || !adminData.lastName || !adminData.email)
      return showToast("error", "Please Fill All Fields To Add Admin");

    setLoading(true);
    try {
      const res = await addAdmin(adminData.email);
      if (res?.success) {
        showToast("success", res?.message);
        setAdminData({
          firstName: "",
          lastName: "",
          email: "",
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
        <Button variant="outline">Add Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150">
        <form onSubmit={handelSubmit}>
          <DialogHeader className={"mb-5"}>
            <DialogTitle className={"text-center"}>Add Admin</DialogTitle>
            <DialogDescription className={"text-center"}>
              Here You Can Add New Admin To Your Website. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={adminData.firstName}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={adminData.lastName}
                onChange={handelInputChange}
              />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={adminData.email}
                onChange={handelInputChange}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className={"mt-5"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding...." : "Add Admin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
