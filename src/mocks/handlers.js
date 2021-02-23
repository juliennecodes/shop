import { rest } from "msw";
import { Cart } from "./cart";

let cart = new Cart();

const cupJelly = {
  name: "Cup Jelly",
  price: 1,
  category: "Snack",
  imageLocation: "images/cup-jelly.jpeg",
};
const custard = {
  name: "Custard",
  price: 2,
  category: "Snack",
  imageLocation: "images/custard.jpeg",
};

const menuItems = [cupJelly, custard];

export const handlers = [
  rest.get("/menu", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(menuItems));
  }),

  rest.get("/cart", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart.toJSON()));
  }),

  rest.post("/cart", (req, res, ctx) => {
    const itemName = req.body.itemName;
    const newQty = req.body.newQty;
    const item = pickItemFromMenu(itemName, menuItems);
    const updatedCart = cart.updateCart(item, newQty);
    cart = updatedCart;
    return res(ctx.status(200), ctx.json(cart.toJSON()));
  }),

  rest.delete("/cart", (req, res, ctx) => {
    const itemName = req.body.itemName;
    const newQty = req.body.newQty;
    const item = pickItemFromMenu(itemName, menuItems);
    const updatedCart = cart.updateCart(item, newQty);
    cart = updatedCart;
    return res(ctx.status(200), ctx.json(cart.toJSON()));
  }),

  rest.get("/reset", (req, res, ctx) => {
    cart = new Cart();
    return res(ctx.status(200), ctx.json(cart.toJSON()));
  }),
];

function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}
