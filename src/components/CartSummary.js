function Subtotal({ subtotal }) {
  return (
    <div>
      <p>Subtotal</p>
      <p>{subtotal}</p>
    </div>
  );
}

function Tax({ tax }) {
  return (
      <div>
          <p>Tax</p>
          <p>{tax}</p>
      </div>
  );
}

function Total({ total }) {
  return (
      <div>
          <p>Total</p>
          <p>{total}</p>
      </div>
  );
}

export function CartSummary({ subtotal, tax, total }) {
  return (
    <>
      <h1>Cart</h1>
      <Subtotal subtotal={subtotal} />
      <Tax tax={tax} />
      <Total total={total} />
    </>
  );
}
