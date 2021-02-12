import { useState, useEffect } from "react";
import { MenuItems } from "./MenuItems";

function Loading() {
  return <p>Loading</p>;
}

export function Menu({ updateCart }) {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    fetch("/menu")
      .then((res) => res.json())
      .then((menuItems) => setMenuItems(menuItems));
  }, []);

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
