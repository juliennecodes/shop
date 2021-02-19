const { Cart } = require("./cart");
const { pickItemFromMenu, convertToCartObject } = require("./helper-functions");

const { isInCart, isNotInCart, removeZeroQuantityItems } = require("./cart-checker");

const {
  updateCart,
  changeItemQuantity,
  addItemToCart,
  removeItemFromCart,
} = require("./cart-modifier");

test("cart updates", () => {
  const cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],
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

  const updatedCart = updateCart("Cup Jelly", cart, 5, menuItems);
  expect(updatedCart).toEqual({
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 5,
      },
    ],
    subtotal: 7,
    tax: 0.91,
    total: 7.91,
  });
});

test("item is in cart", () => {
  let cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],
  };

  expect(isInCart("Cup Jelly", cart)).toBeFalsy();
  expect(isInCart("Custard", cart)).toBeTruthy();
});

test("item is not in cart", () => {
  let cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],
  };

  expect(isNotInCart("Cup Jelly", cart)).toBeTruthy();
  expect(isNotInCart("Custard", cart)).toBeFalsy();
});

test("item can increase in quantity", () => {
  const cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 3,
      },
    ],
  };

  const custardBeforeAdding = findItem("Custard", cart);
  expect(custardBeforeAdding.quantity).toEqual(3);

  const updatedCartItems = changeItemQuantity("Custard", cart, 7);

  const updatedCart = new Cart(updatedCartItems);

  const custardAfterAdding = findItem("Custard", updatedCart);
  expect(custardAfterAdding.quantity).toEqual(10);
});

test("item can decrease in quantity", () => {
  const cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 3,
      },
    ],
  };

  const custardBeforeSubtracting = findItem("Custard", cart);
  expect(custardBeforeSubtracting.quantity).toEqual(3);

  const updatedCartItems = changeItemQuantity("Custard", cart, -1);

  const updatedCart = new Cart(updatedCartItems);

  const custardAfterSubtracting = findItem("Custard", updatedCart);
  expect(custardAfterSubtracting.quantity).toEqual(2);
});

test("item is added to cart", () => {
  const cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],
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

  const updatedCartItems = addItemToCart("Cup Jelly", cart, 1, menuItems);
  const updatedCart = new Cart(updatedCartItems);

  expect(updatedCart.cartItems).toEqual([
    {
      name: "Custard",
      price: 2,
      category: "Snack",
      imageLocation: "images/custard.jpeg",
      quantity: 1,
    },
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 1,
    },
  ]);
});

test("pick item from menu is working", () => {
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

  const custardItem = pickItemFromMenu("Custard", menuItems);
  expect(custardItem).toEqual({
    name: "Custard",
    price: 2,
    category: "Snack",
    imageLocation: "images/custard.jpeg",
  });
});

test("cart is converted to cart object", () => {
  const cart = new Cart([
    {
      name: "Custard",
      price: 2,
      category: "Snack",
      imageLocation: "images/custard.jpeg",
      quantity: 1,
    },
    {
      name: "Cup Jelly",
      price: 1,
      category: "Snack",
      imageLocation: "images/cup-jelly.jpeg",
      quantity: 5,
    },
  ]);

  const cartObject = convertToCartObject(cart);

  expect(cartObject).toEqual({
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
      {
        name: "Cup Jelly",
        price: 1,
        category: "Snack",
        imageLocation: "images/cup-jelly.jpeg",
        quantity: 5,
      },
    ],
    subtotal: 7,
    tax: 0.91,
    total: 7.91,
  });
});

test("item can be deleted from the cart", () => {
  const cart = {
    cartItems: [
      {
        name: "Custard",
        price: 2,
        category: "Snack",
        imageLocation: "images/custard.jpeg",
        quantity: 1,
      },
    ],
  };

  expect(removeItemFromCart("Custard", cart)).toEqual({
    cartItems: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  });
});

test('check for removing zero quantity items works', ()=> {
  const cartItems = [
    {
      name: "Custard",
      price: 2,
      category: "Snack",
      imageLocation: "images/custard.jpeg",
      quantity: 0,
    },
  ];

  expect(removeZeroQuantityItems(cartItems)).toEqual([]);
  //do I do const cart instead of cartItems?
  //I did cartItems because removeZeroQuantityItems takes in cart items
  
})

//Helper functions
function findItem(itemName, cart) {
  return cart.cartItems.find((cartItem) => cartItem.name === itemName);
}
