import { CartItem } from "./CartItem";

export function CartItems({ cartItems }) {
  return (
    <div>
      {cartItems.map((cartItem, index) => {
          return <CartItem 
          name={cartItem.name}
          price={cartItem.price}
          quantity={cartItem.quantity}
          key={index}
          />
          })}
    </div>
  );
}

// export function CartItems(){
//     return(
//         <p>:)</p>
//     );
// }
