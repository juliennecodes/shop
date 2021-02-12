import "./Quantity.css";

export function Quantity({ name, quantity, updateCart }) {
  return (
    <div className="quantity">
      <DecreaseQty name={name} updateCart={updateCart}/>
      <input className="cart-item__quantity" value={quantity}/>
      <IncreaseQty name={name} updateCart={updateCart}/>
    </div>
  );
}

function IncreaseQty({name, updateCart}) {
  return (
    <button className="increase-qty" onClick={()=> updateCart(name, 1)} data-test-id="increaseQtyButton">
      <svg
        className="increase-qty__svg"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>
    </button>
  );
}

function DecreaseQty({name, updateCart}) {
  return (
    <button className="decrease-qty" onClick={()=> updateCart(name, -1)} data-test-id="decreaseQtyButton">
      <svg
        className="decrease-qty__svg"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>
    </button>
  );
}
