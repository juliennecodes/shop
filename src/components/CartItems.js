import { CartItem } from "./CartItem";
import "./CartItems.css";

export function CartItems({ cartItems, updateCart, removeItem }) {
  return (
    <div className="cart-items">
      <ul className="cart-items__list">
        {cartItems.map((cartItem, index) => {
          return (
            <CartItem
              imageLocation={cartItem.imageLocation}
              name={cartItem.name}
              price={cartItem.price}
              quantity={cartItem.quantity}
              updateCart={updateCart}
              removeItem={removeItem}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
}

// export function CartItems(){
//     return(
//         <p>:)</p>
//     );
// }
