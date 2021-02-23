const { menuItems } = require("./database-cafe");
const { Cart } = require("./cart");
const express = require("express");
const app = express();

/*----------------------------------------------------------------------------------------------------------------------------*/
function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}

let cart = new Cart();
/*----------------------------------------------------------------------------------------------------------------------------*/
app.use(express.json());

app.get("/menu", (req, res) => {
  console.log("get request made");
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  console.log("get request to cart made");
  res.json(cart.toJSON());
});

app.post("/cart", (req, res) => {
  console.log("post request to cart made");
  const itemName = req.body.itemName;
  const newQty = req.body.newQty;
  const item = pickItemFromMenu(itemName, menuItems)
  const updatedCart = cart.updateCart(item, newQty);
  cart = updatedCart;
  console.log(cart.toJSON());
  res.json(cart.toJSON());
});

app.delete('/cart', (req, res)=>{
  const itemName = req.body.itemName;
  const item = pickItemFromMenu(itemName, menuItems);
  const updatedCart = cart.removeItem(item);
  cart = updatedCart;
  console.log(cart.toJSON());
  res.json(cart.toJSON());
})

app.listen(8000, () => console.log("listening at port 8000"));