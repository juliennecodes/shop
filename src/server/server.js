const { menuItems } = require("./database-cafe");
const express = require("express");
const app = express();
const { Cart } = require("./cart");

/*--------------------------------------------------------------

--------------------------------------------------------------*/
let cart = new Cart();

/*--------------------------------------------------------------

--------------------------------------------------------------*/
function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}

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
  console.log(cart);
  res.json(cart);
});

app.delete('/cart', (req, res)=>{
  const itemName = req.body.itemName;
  const updatedCart = removeItem(itemName, cart);
  cart = updatedCart;
  console.log(cart);
  res.json(cart);
})

app.listen(8000, () => console.log("listening at port 8000"));

exports.pickItemFromMenu = pickItemFromMenu;