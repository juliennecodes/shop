const { Cart } = require("./cart");
const {
  updateCart,
  isInCart,
  isNotInCart,
  changeItemQuantity,
  addItemToCart,
  pickItemFromShelf,
} = require("./server-helper-functions");

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
    taxRate: 0.13,
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
        quantity: 1,
      },
    ],
  };

  const custardBeforeAdding = findItem("Custard", cart);
  expect(custardBeforeAdding.quantity).toEqual(1);

  const updatedCartItems = changeItemQuantity("Custard", cart, 1);

  const updatedCart = new Cart(updatedCartItems);

  const custardAfterAdding = findItem("Custard", updatedCart);
  expect(custardAfterAdding.quantity).toEqual(2);
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
//I used toContain so and so items but I guess you can limit yourself to only one? It was saying I was expecting
//custard only but I had cup jelly as well, just separated by a comma
// Expected value: {"category": "Snack", "imageLocation": "images/custard.jpeg", "name": "Custard", "price": 2, "quantity": 1}
// Received array: [{"category": "Snack", "imageLocation": "images/custard.jpeg", "name": "Custard", "price": 2, "quantity": 1}, {"category": "Snack", "imageLocation": "images/cup-jelly.jpeg", "name": "Cup Jelly", "price": 1, "quantity": 1}]

test("pick item from shelf is working", () => {
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

  const custardItem = pickItemFromShelf("Custard", menuItems);
  expect(custardItem).toEqual({
    name: "Custard",
    price: 2,
    category: "Snack",
    imageLocation: "images/custard.jpeg",
  });
});

//Helper functions

function findItem(itemName, cart) {
  return cart.cartItems.find((cartItem) => cartItem.name === itemName);
}
