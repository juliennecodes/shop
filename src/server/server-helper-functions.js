const { Cart } = require("./cart");

function updateCart(itemName, cart, newQty, shelf) {
  if (isInCart(itemName, cart)) {
    let updatedCartItems = changeItemQuantity(itemName, cart);
    return new Cart(updatedCartItems);
  }

  if (isNotInCart(itemName, cart) && newQty > 0) {
    let updatedCartItems = addItemToCart(itemName, cart, newQty, shelf);
    return new Cart(updatedCartItems);
  } else {
    return cart;
  }
}

function isInCart(itemName, cart) {
  let x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  if (x) {
    return true;
  } else {
    return false;
  }
  //is this necessary if I'm using the helper function in a conditional
  //just making it explicit that I'm producing a boolean value
}

function isNotInCart(itemName, cart) {
  let x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  if (x) {
    return false;
  } else {
    return true;
  }
  //is this necessary if I'm using the helper function in a conditional
  //needed for inversion of boolean
}

function changeItemQuantity(itemName, cart, newQty){
    let updatedCart = cart.cartItems.map((cartItem) => {
        if(cartItem.name === itemName){
            return {...cartItem, quantity: cartItem.quantity + newQty};
        } else {
            return cartItem;
        }
    });
    return updatedCart;
}

function addItemToCart(itemName, cart, newQty, shelf){
    let item = pickItemFromShelf(itemName, shelf);
    let updatedCart = [...cart.cartItems, {...item, quantity: newQty}];
    return updatedCart;
}


function pickItemFromShelf(itemName, shelf){
    //return object
    return shelf.find((menuItem) => menuItem.name === itemName);
}


exports.updateCart = updateCart;
exports.isInCart = isInCart;
exports.isNotInCart = isNotInCart;
exports.changeItemQuantity = changeItemQuantity;
exports.addItemToCart = addItemToCart;
exports.pickItemFromShelf = pickItemFromShelf;