// import {useEffect} from 'react';
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";

function Loading() {
  return <p>Loading</p>;
}

export function Cart({ cart, updateCart }) {
  return cart ? (
    <div>
      <CartItems cartItems={cart.cartItems} updateCart={updateCart}/>
      <OrderSummary subtotal={cart.subtotal} tax={cart.tax} total={cart.total} />
    </div>
  ) : (
    <div>
      <h1>Cart</h1>
      <Loading />
    </div>
  );
}
