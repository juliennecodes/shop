import { CartItem } from "./CartItem";

export function CartItems({ cartItems }) {
  return (
    <div>
      <h1>Cart</h1>
      <ul className="cart-items">
        {cartItems.map((cartItem, index) => {
          return (
            <CartItem
              imageLocation={cartItem.imageLocation}
              name={cartItem.name}
              price={cartItem.price}
              quantity={cartItem.quantity}
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
