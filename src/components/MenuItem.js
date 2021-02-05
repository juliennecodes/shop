import "./MenuItem.css";

export function MenuItem({ name, price, imageLocation }) {
    return (
      <li className="menu-item">
        <img
          className="menu-item__image"
          src={imageLocation}
          alt={name}
        ></img>
        <p className="menu-item__name">{name}</p>
        <p className="menu-item__price">{price}</p>
        <button className="menu-item__button">Add to Cart</button>
      </li>
    );
  }