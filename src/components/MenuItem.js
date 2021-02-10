import "./MenuItem.css";

export function MenuItem({ name, price, imageLocation, updateCart }) {
    return (
      <li className="menu-item">
        <img
          className="menu-item__image"
          src={imageLocation}
          alt={name}
        ></img>
        <p className="menu-item__name">{name}</p>
        <p className="menu-item__price">{price.toFixed(2)}</p>
        <button className="menu-item__button" onClick={()=> updateCart(name, 1)}>Add to Cart</button>
      </li>
    );
  }