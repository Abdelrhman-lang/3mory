import React from "react";
import HeaderClient from "./HeaderClient";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/services/user/getUser";

export default async function Header() {
  return <HeaderClient />;
}
