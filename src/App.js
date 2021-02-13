import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Cart } from "./components/Cart";
import { HomePage } from "./components/Homepage";
import { Menu } from "./components/Menu";
import { Navigation } from "./components/Navigation";

function App() {
  const [cart, setCart] = useState(null);
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch("/cart")
      .then((res) => res.json())
      .then((serverCart) => {
        if (mounted) setCart(serverCart);
      });

    fetch("/menu")
      .then((res) => res.json())
      .then((menuItems) => {
        if (mounted) setMenuItems(menuItems);
      });
    return () => (mounted = false);
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

  const removeItem = (itemName) => {
    fetch("/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemName: itemName }),
    })
      .then((res) => res.json())
      .then((updatedCart) => setCart(updatedCart));
  };

  return (
    <div className="App">
      <h1>Cafe</h1>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/menu">
            <Menu menuItems={menuItems} updateCart={updateCart} />
          </Route>

          <Route path="/cart">
            <Cart
              cart={cart}
              setCart={setCart}
              updateCart={updateCart}
              removeItem={removeItem}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
