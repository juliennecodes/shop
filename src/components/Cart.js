// import {useEffect} from 'react';
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import "./Cart.css";

function Loading() {
  return <p>Loading</p>;
}

export function Cart({ cart, updateCart, removeItem }) {
  return cart ? (
    <div className="cart">
      {cart.cartItems.length > 0 ? (
        <CartItems
          cartItems={cart.cartItems}
          updateCart={updateCart}
          removeItem={removeItem}
        />
      ) : (
        <p className="empty-cart-message">Cart is empty</p>
      )}
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
