const { menuItems } = require("./database-cafe");
const { Cart } = require("./cart");
const express = require("express");
const app = express();
const path = require("path");
/*----------------------------------------------------------------------------------------------------------------------------*/
function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}

let cart = new Cart();
/*----------------------------------------------------------------------------------------------------------------------------*/
app.use(express.json());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  res.json(cart.toJSON());
});

app.post("/cart", (req, res) => {
  const itemName = req.body.itemName;
  const newQty = req.body.newQty;
  const item = pickItemFromMenu(itemName, menuItems)
  const updatedCart = cart.updateCart(item, newQty);
  cart = updatedCart;
  res.json(cart.toJSON());
});

app.delete('/cart', (req, res)=>{
  const itemName = req.body.itemName;
  const item = pickItemFromMenu(itemName, menuItems);
  const updatedCart = cart.removeItem(item);
  cart = updatedCart;
  res.json(cart.toJSON());
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(process.env.PORT || 8000);