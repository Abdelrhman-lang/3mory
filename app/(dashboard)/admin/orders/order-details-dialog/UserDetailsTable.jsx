import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

export default function UserDetailsTable({ userDetails }) {
  return (
    <Table>
      <TableCaption className={"text-center"}>
        User and Shipping Details
      </TableCaption>
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
  );
}
