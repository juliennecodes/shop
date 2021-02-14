// import {useEffect} from 'react';
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import './Cart.css';

function Loading() {
  return <p>Loading</p>;
}

export function Cart({ cart, updateCart, removeItem }) {
  return cart ? (
    <div className="cart">
      <CartItems
        cartItems={cart.cartItems}
        updateCart={updateCart}
        removeItem={removeItem}
      />
      <OrderSummary
        subtotal={cart.subtotal}
        tax={cart.tax}
        total={cart.total}
      />
    </div>
  ) : (
    <div className="cart">
      <Loading />
    </div>
  );
}
