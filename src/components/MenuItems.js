import { MenuItem } from "./MenuItem";
import './MenuItems.css';

export function MenuItems({ menuItems, updateCart }) {
  return (
    <ul className="menu-items">
      {menuItems.map((menuItem, index) => {
        return <MenuItem
          name={menuItem.name}
          price={menuItem.price}
          imageLocation={menuItem.imageLocation}
          key={index}
          updateCart={updateCart}
        />;
      })}
    </ul>
  );
}
