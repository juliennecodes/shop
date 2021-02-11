import "./Quantity.css";

export function Quantity({ quantity }) {
  return (
    <div className="quantity">
      <DecreaseQty />
      <input className="cart-item__quantity" value={quantity}/>
      <IncreaseQty />
    </div>
  );
}

function IncreaseQty() {
  return (
    <button className="increase-qty">
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

function DecreaseQty() {
  return (
    <button className="decrease-qty">
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
