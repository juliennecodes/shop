// import {useEffect} from 'react';
import { CartItems } from "./CartItems";
import { OrderSummary } from "./OrderSummary";
import "./Cart.css";

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
        <EmptyCart />
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

function EmptyCart() {
  return <p className="empty-cart-message">Cart is empty</p>;
}

function Loading() {
  return <p>Loading</p>;
}

