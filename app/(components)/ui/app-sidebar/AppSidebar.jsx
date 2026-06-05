"use client";
import {
  Check,
  Earth,
  Globe,
  Home,
  ListOrdered,
  Package,
  Plus,
  User,
  User2Icon,
  View,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    id: 1,
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    id: 2,
    title: "Inventory",
    url: "/admin/products",
    icon: Package,
  },

  {
    id: 3,
    title: "Orders",
    url: "/admin/orders",
    icon: ListOrdered,
  },
  {
    id: 4,
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    id: 5,
    title: "Admins",
    url: "/admin/admins",
    icon: User2Icon,
  },
  {
    id: 6,
    title: "Go To Website",
    url: "/",
    icon: Earth,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Control</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={`${pathname === item.url ? "font-bold text-primary" : ""}`}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
