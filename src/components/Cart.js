// import {useEffect} from 'react';
import { CartItems } from "./CartItems";
import { CartSummary } from "./CartSummary";

function Loading() {
  return <p>Loading</p>;
}

export function Cart({ cart }) {
  return cart ? (
    <div>
      <h1>Cart</h1>
      <CartItems cartItems={cart.cartItems}/>
      <CartSummary subtotal={cart.subtotal} tax={cart.tax} total={cart.total} />
    </div>
  ) : (
    <div>
      <h1>Cart</h1>
      <Loading />
    </div>
  );
}
