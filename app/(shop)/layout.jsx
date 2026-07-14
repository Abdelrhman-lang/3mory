import React from "react";
import FixedArrow from "../(components)/shared/fixed-arrow/FixedArrow";
import Cart from "../(components)/features/cart/Cart";
import SubHeader from "../(components)/layout/sub-header/SubHeader";
import Header from "../(components)/layout/header/Header";
import Footer from "../(components)/layout/footer/Footer";

export default function ShopLayout({ children }) {
  return (
    <div>
      <FixedArrow />
      <Cart />
      <SubHeader />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
