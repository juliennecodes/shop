import { NavLink } from "react-router-dom";
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <NavLink to="/menu" activeClassName="selected">Menu</NavLink>
        </li>

        <li>
          <NavLink to="/cart" activeClassName="selected">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}
