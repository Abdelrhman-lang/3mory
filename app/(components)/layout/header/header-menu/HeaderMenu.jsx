"use client";
import { CircleX, User } from "lucide-react";
import React from "react";
import HeaderLinks from "../header-links/HeaderLinks";
import SocialmediaLinks from "../../../features/socialmedia-links/SocialmediaLinks";
import Overlay from "../../../shared/overlay/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "@/RTK/slices/menuSlice";
import { UserButton, useUser } from "@clerk/nextjs";
import Login from "@/app/(components)/shared/login/Login";
import { MdDashboard } from "react-icons/md";

export default function HeaderMenu() {
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);
  const { isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role;
  return (
    <div className="lg:hidden">
      <Overlay prop={isMenuOpen} fn={() => dispatch(closeMenu())} />
      <div
        className={`fixed z-50 top-0 ${isMenuOpen ? "left-0" : "-left-full"} w-3/4 h-full bg-white border-r shadow-sm transition-all duration-700`}
      >
        <div className="pt-10 px-5 flex items-center justify-between">
          <h3 className="font-bold">Menu</h3>
          <CircleX
            size={20}
            onClick={() => dispatch(closeMenu())}
            className="cursor-pointer"
          />
        </div>
        <div className="pt-10 px-5">
          <HeaderLinks
            ulClassName={"flex flex-col gap-5"}
            liClassname={"text-accent text-sm"}
            listStyle={"border-b pb-3"}
          />
        </div>
        <div className="flex items-center justify-center pt-10">
          {!isSignedIn && <Login />}
        </div>
        <div className="mt-8 text-center">
          <a
            href="mailto:abdokhaled766@gmail.com"
            className="text-sm text-accent"
          >
            abdokhaled766@gmail.com
          </a>
          <SocialmediaLinks />
        </div>

        <div className="absolute bottom-10 left-5">
          {isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  href="/user-account"
                  label="View My Account"
                  labelIcon={<User className="w-4 h-4" />}
                />
              </UserButton.MenuItems>
              {userRole === "admin" && (
                <UserButton.MenuItems>
                  <UserButton.Link
                    href="/admin"
                    label="Go To Dashboard"
                    labelIcon={<MdDashboard className="w-4 h-4" />}
                  />
                </UserButton.MenuItems>
              )}
            </UserButton>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
