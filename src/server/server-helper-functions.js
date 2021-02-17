const { Cart } = require("./cart");

function updateCart(itemName, cart, newQty, shelf) {
  if (isInCart(itemName, cart)) {
    const updatedCartItems = changeItemQuantity(itemName, cart, newQty);
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  }

  if (isNotInCart(itemName, cart) && newQty > 0) {
    const updatedCartItems = addItemToCart(itemName, cart, newQty, shelf);
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  } else {
    return cart;
  }
}

function isInCart(itemName, cart) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

//   if (x) {return true;} else {return false;}
    if (x) return true; else return false;
}

function isNotInCart(itemName, cart) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

//   if (x) {return false;} else {return true;}
    if (x) return false; else return true;
}

function changeItemQuantity(itemName, cart, newQty) {
  const updatedCart = cart.cartItems.map((cartItem) => {
    if (cartItem.name === itemName) {
      return { ...cartItem, quantity: cartItem.quantity + newQty };
    } else {
      return cartItem;
    }
  });

  const checkedUpdatedCart = updatedCart.filter(cartItem => cartItem.quantity > 0);
  return checkedUpdatedCart;
}

function addItemToCart(itemName, cart, newQty, shelf) {
  const item = pickItemFromShelf(itemName, shelf);
  const updatedCart = [...cart.cartItems, { ...item, quantity: newQty }];
  return updatedCart;
}

function pickItemFromShelf(itemName, shelf) {
  return shelf.find((menuItem) => menuItem.name === itemName);
}

function convertToCartObject(cart) {
  return {
    cartItems: [...cart.cartItems],
    subtotal: cart.subtotal,
    tax: cart.tax,
    total: cart.total,
  };
}

function removeItem(itemName, cart){
  if(isInCart(itemName, cart)){
    const cartItems = cart.cartItems;
    const updatedCartItems = cartItems.filter(cartItem => !(cartItem.name === itemName));
    const updatedCart = new Cart(updatedCartItems);
    return convertToCartObject(updatedCart);
  } else {
    return cart;
  }
}

exports.updateCart = updateCart;
exports.isInCart = isInCart;
exports.isNotInCart = isNotInCart;
exports.changeItemQuantity = changeItemQuantity;
exports.addItemToCart = addItemToCart;
exports.pickItemFromShelf = pickItemFromShelf;
exports.convertToCartObject = convertToCartObject;
exports.removeItem = removeItem;
