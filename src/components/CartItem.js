import "./CartItem.css";
import { Quantity } from "./Quantity";

export function CartItem({ imageLocation, name, price, quantity, updateCart, removeItem }) {
  return (
    <li className="cart-item">
      <img className="cart-item__image" src={imageLocation} alt={name}></img>
      <p className="cart-item__name">{name}</p>
      <Quantity name={name} quantity={quantity} updateCart={updateCart} />
      <p className="cart-item__price">{(price * quantity).toFixed(2)}</p>
      <Remove name={name} removeItem={removeItem}/>
    </li>
  );
}

function Remove({name, removeItem}) {
  return (
    <div className="cart-item__remove">
      <svg
        aria-label="removeButton"
        onClick={()=> removeItem(name)}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
    </div>
  );
}
