import { MenuItem } from "./MenuItem";
import './MenuItems.css';

export function MenuItems({ menuItems }) {
  return (
    <ul class="menu-items">
      {menuItems.map((menuItem, index) => {
        return <MenuItem
          name={menuItem.name}
          price={menuItem.price}
          imageLocation={menuItem.imageLocation}
          key={index}
        />;
      })}
    </ul>
  );
}
