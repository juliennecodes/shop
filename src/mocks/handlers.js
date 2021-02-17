import { rest } from "msw";
import {
  updateCart,
  removeItem,
} from "./helper-functions";

let cart = {
  cartItems: [],
  subtotal: 0,
  tax: 0,
  total: 0,
};

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
    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.post("/cart", (req, res, ctx) => {
    const itemName = req.body.itemName;
    const newQty = req.body.newQty;
    const updatedCart = updateCart(itemName, cart, newQty, menuItems);
    cart = updatedCart;
    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.delete("/cart", (req, res, ctx) => {
    const itemName = req.body.itemName;
    const updatedCart = removeItem(itemName, cart);
    cart = updatedCart;
    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.get("/reset", (req, res, ctx) => {
    cart = {
      cartItems: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    };
    return res(ctx.status(200), ctx.json(cart));
  }),
];
