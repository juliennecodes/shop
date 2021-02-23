const { Cart } = require("./cart");

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

test("item is added to cart", () => {
  const cart = new Cart();
  const itemName = "Cup Jelly";
  const newQty = 1;
  const cupJelly = pickItemFromMenu(itemName, menuItems);

  const updatedCart = cart.updateCart(cupJelly, newQty);

  expect(updatedCart.toJSON()).toEqual({
    cartItems: [
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 1,
      },
    ],

    subtotal: 1,
    tax: 0.13,
    total: 1.13,
  });
});

test("item can increase in quantity", () => {
  const cart = new Cart([
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 1,
    },
  ]);

  const itemName = "Cup Jelly";
  const newQty = 1;
  const cupJelly = pickItemFromMenu(itemName, menuItems);

  const updatedCart = cart.updateCart(cupJelly, newQty);

  expect(updatedCart.toJSON()).toEqual({
    cartItems: [
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 2,
      },
    ],

    subtotal: 2,
    tax: 0.26,
    total: 2.26,
  });
});

test("item can decrease in quantity", () => {
  const cart = new Cart([
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 2,
    },
  ]);
  const itemName = "Cup Jelly";
  const newQty = -1;
  const cupJelly = pickItemFromMenu(itemName, menuItems);

  const updatedCart = cart.updateCart(cupJelly, newQty);

  expect(updatedCart.toJSON()).toEqual({
    cartItems: [
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 1,
      },
    ],

    subtotal: 1,
    tax: 0.13,
    total: 1.13,
  });
});

test("item can decrease in quantity to zero and is then removed", () => {
  const cart = new Cart([
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 1,
    },
    {
      name: "Custard",
      price: 2,
      category: "Snack",
      imageLocation: "images/custard.jpeg",
      quantity: 1,
    },
  ]);
  const itemName = "Cup Jelly";
  const newQty = -1;
  const cupJelly = pickItemFromMenu(itemName, menuItems);

  const updatedCart = cart.updateCart(cupJelly, newQty);

  expect(updatedCart.toJSON()).toEqual({
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],

    subtotal: 2,
    tax: 0.26,
    total: 2.26,
  });
});

test("item is removed from cart", () => {
  const cart = new Cart([
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 1,
    },
    {
      name: "Custard",
      price: 2,
      category: "Snack",
      imageLocation: "images/custard.jpeg",
      quantity: 1,
    },
  ]);

  const itemName = "Custard";
  const custard = pickItemFromMenu(itemName, menuItems);

  const updatedCart = cart.removeItem(custard);
  expect(updatedCart.toJSON()).toEqual({
    cartItems: [
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 1,
      },
    ],

    subtotal: 1,
    tax: 0.13,
    total: 1.13,
  });
});

function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}
