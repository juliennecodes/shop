import { rest } from "msw";

export const handlers = [
  rest.get("/menu", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Red Bean Bread",
          price: 5,
          category: "Bread",
          imageLocation: "images/red-bean-bread.jpeg",
        },
      ])
    );
  }),

  rest.get("/cart", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cartItems: [
          {
            name: "Red Bean Bread",
            quantity: 1,
            price: 5,
          },
        ],
        subtotal: 5,
        tax: 0.65,
        total: 5.65,
      })
    );
  }),

  rest.post("/cart", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cartItems: [
          {
            name: "Red Bean Bread",
            quantity: 3,
          },
        ],
        subtotal: 15,
        tax: 1.94,
        total: 16.94,
      })
    );
  }),

  rest.delete("/cart", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cartItems: [],
        subtotal: 0,
        tax: 0,
        total: 0,
      })
    );
  }),
];
