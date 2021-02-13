import { useState, useEffect } from "react";
import { MenuItems } from "./MenuItems";

function Loading() {
  return <p>Loading</p>;
}

export function Menu({ menuItems, updateCart }) {
  return menuItems ? (
    <div>
      <h1>Menu</h1>
      <MenuItems menuItems={menuItems} updateCart={updateCart} />
    </div>
  ) : (
    <div>
      <h1>Menu</h1>
      <Loading />
    </div>
  );
}
