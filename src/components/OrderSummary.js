import "./OrderSummary.css";

function Subtotal({ subtotal }) {
  return (
    <div className="subtotal">
      <p className="subtotal__title">Subtotal</p>
      <p className="subtotal__cost">{subtotal.toFixed(2)}</p>
    </div>
  );
}

function Tax({ tax }) {
  return (
      <div className="tax">
          <p className="tax__title">Tax</p>
          <p className="tax__cost">{tax.toFixed(2)}</p>
      </div>
  );
}

function Total({ total }) {
  return (
      <div className="total">
          <p className="total__title">Total</p>
          <p className="total__cost">{total.toFixed(2)}</p>
      </div>
  );
}

export function OrderSummary({ subtotal, tax, total }) {
  return (
    <div className="order-summary">
      <h2 className="order-summary__heading">Order Summary</h2>
      <Subtotal subtotal={subtotal} />
      <Tax tax={tax} />
      <Total total={total} />
      <button className="checkout" onClick={()=> alert('Checkout!')}>Checkout</button>
    </div>
  );
}
