import React from "react";
import CheckoutClient from "./CheckoutClient";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/services/user/getUser";

export default async function page() {
  const clerkUser = await currentUser();
  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;
  const userData = await getUser(userEmail);

  return <CheckoutClient user={userData} />;
}
