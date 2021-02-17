import { MenuItems } from "./MenuItems";

function Loading() {
  return <p>Loading</p>;
}

export function Menu({ menuItems, updateCart }) {
  return menuItems ? (
    <div className="menu">
      <MenuItems menuItems={menuItems} updateCart={updateCart} />
    </div>
  ) : (
    <div className="menu">
      <Loading />
    </div>
  );
}
