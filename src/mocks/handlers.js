import { rest } from "msw";

export const handlers = [
  rest.get("/menu", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Red Bean Bread",
          price: 5,
          category: 'Bread',
          imageLocation: 'images/red-bean-bread.jpeg'
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
            price:5,

          },
        ],
        subtotal: 5,
        tax: .65,
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
            quantity: 1,
          },
        ],
        subtotal: 5,
        tax: .65,
        total: 5.65,
      })
    );
  }),
];
