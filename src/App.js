import { useState, useEffect } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { Menu } from "./components/Menu";

function App() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/cart")
      .then((res) => res.json())
      .then((serverCart) => {
        setCart(serverCart)
        if (mounted) setCart(serverCart);
      });
    return ()=> mounted = false;
  }, []);

  const updateCart = (itemName, newQty) => {
    fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName: itemName, newQty: newQty }),
    })
      .then((res) => res.json())
      .then((updatedCart) => setCart(updatedCart));
  };

  return (
    <div className="App">
      <h1>Cafe</h1>
      <Menu updateCart={updateCart} />
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
