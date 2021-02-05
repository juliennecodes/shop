import { useState, useEffect } from "react";
import { MenuItems } from "./MenuItems";

function Loading() {
  return <p>Loading</p>;
}

export function Menu() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    fetch("/menu")
      .then((res) => res.json())
      .then((menuItems) => setMenuItems(menuItems));
  }, []);

  return (
    menuItems? <MenuItems menuItems={menuItems}/> : <Loading/>
  );
}
