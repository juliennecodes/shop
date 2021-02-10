const { menuItems } = require("./database-cafe");
const express = require("express");
const { Cart } = require("./cart");
const app = express();
const {
  updateCart,
  isInCart,
  isNotInCart,
  changeItemQuantity,
  addItemToCart,
  pickItemFromShelf,
} = require("./server-helper-functions");

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
  cart = convertToCartObject(updatedCart);
  //I forgot you have to send cart in a proper format
  //combine convertToCartObject with updateCart
  res.json(cart);
});

app.listen(8000, () => console.log("listening at port 8000"));

function convertToCartObject(cart) {
  // return cart object
  return {
    cartItems: [...cart.cartItems],
    subtotal: cart.subtotal,
    tax: cart.tax,
    total: cart.total,
  };
}
