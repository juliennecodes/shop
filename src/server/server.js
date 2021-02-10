const { menuItems } = require("./database-cafe");
const express = require("express");
const app = express();
const { updateCart } = require("./server-helper-functions");

/*--------------------------------------------------------------

--------------------------------------------------------------*/
let cart = {
  cartItems: [],
  subtotal: 0,
  tax: 0,
  total: 0,
};

/*--------------------------------------------------------------

--------------------------------------------------------------*/
app.use(express.json());

app.get("/menu", (req, res) => {
  console.log("get request made");
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  console.log("get request to cart made");
  res.json(cart);
});

app.post("/cart", (req, res) => {
  console.log("post request to cart made");
  const itemName = req.body.itemName;
  const newQty = req.body.newQty;
  const updatedCart = updateCart(itemName, cart, newQty, menuItems);
  cart = updatedCart;
  res.json(cart);
});

app.listen(8000, () => console.log("listening at port 8000"));
