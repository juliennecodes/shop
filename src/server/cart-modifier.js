const { Cart } = require("./cart");
const { pickItemFromMenu, convertToCartObject} = require("./helper-functions");
const { isInCart, isNotInCart, removeZeroQuantityItems} = require("./cart-checker");

function updateCart(itemName, cart, newQty, menu) {
  if (isInCart(itemName, cart)) {
    const updatedCartItems = changeItemQuantity(itemName, cart, newQty);
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  }

  if (isNotInCart(itemName, cart) && newQty > 0) {
    const updatedCartItems = addItemToCart(itemName, cart, newQty, menu);
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  } else {
    return cart;
  }
}

function changeItemQuantity(itemName, cart, newQty) {
  const updatedCart = cart.cartItems.map((cartItem) => {
    if (cartItem.name === itemName) {
      return { ...cartItem, quantity: cartItem.quantity + newQty };
    } else {
      return cartItem;
    }
  });

  // const checkedUpdatedCart = updatedCart.filter(
  //   (cartItem) => cartItem.quantity > 0
  // );
  const checkedUpdatedCart = removeZeroQuantityItems(updatedCart)
  return checkedUpdatedCart;

  //should I just do this?
  // return removeZeroQuantityItems(updatedCart);
  //I'm also not sure about the naming, it makes it seem as though there are 
  //always zero quantity items when you're checking just in case
}

function addItemToCart(itemName, cart, newQty, menu) {
  const item = pickItemFromMenu(itemName, menu);
  const updatedCart = [...cart.cartItems, { ...item, quantity: newQty }];
  return updatedCart;
}

function removeItemFromCart(itemName, cart) {
  if (isInCart(itemName, cart)) {
    const cartItems = cart.cartItems;
    const updatedCartItems = cartItems.filter(
      (cartItem) => !(cartItem.name === itemName)
    );
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  } else {
    return cart;
  }
}

exports.updateCart = updateCart;
exports.changeItemQuantity = changeItemQuantity;
exports.addItemToCart = addItemToCart;
exports.removeItemFromCart = removeItemFromCart;
