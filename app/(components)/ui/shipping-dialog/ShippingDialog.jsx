"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser } from "@/services/user/getUser";
import { useEffect, useState } from "react";
export function ShippingDialog({ order }) {
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await getUser(order?.userEmail);
      if (res) {
        setUserDetails(res);
      }
    } catch (error) {
      console.error("Error Fetching User Details", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (open) {
      fetchUserDetails();
    }
  }, [open, order?.userEmail]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">View</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Shipping Details
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              Here You Can View Order Shipping Details
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner className={"size-10"} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={"text-center"}>First Name</TableHead>
                  <TableHead className={"text-center"}>Last Name</TableHead>
                  <TableHead className={"text-center"}>Address</TableHead>
                  <TableHead className={"text-center"}>Phone Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className={"text-center"}>
                    {userDetails?.firstName}
                  </TableCell>
                  <TableCell className={"text-center"}>
                    {userDetails?.lastName}
                  </TableCell>
                  <TableCell className={"text-center"}>
                    {userDetails?.address}
                  </TableCell>
                  <TableCell className={"text-center"}>
                    {userDetails?.phoneNumber}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
