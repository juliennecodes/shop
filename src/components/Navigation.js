import { Link } from "react-router-dom";
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
