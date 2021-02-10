const { Cart } = require("./cart");
const { menuItems } = require("./database-cafe");

function updateCart(itemName, cart, newQty, shelf) {
  // return cart
  if (isInCart(itemName, cart)) {
    let updatedCartItems = changeItemQuantity(itemName, cart);
    return new Cart(updatedCartItems);
  }

  if (isNotInCart(itemName, cart) && newQty > 0) {
    let updatedCartItems = addItemToCart(itemName, cart, newQty, shelf);
    return new Cart(updatedCartItems);
  } else {
    return cart;
    //for cases where it's not in cart and the new qty is there to remove an item
  }
}

function isInCart(itemName, cart) {
  // return true or false, on whether item is in cart
  let x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });
  //returns a value if it is able to find an item or undefined if it is not

  if (x) {
    return true;
  } else {
    return false;
  }
  //is this necessary if I'm using the helper function in a conditional
}

function isNotInCart(itemName, cart) {
  // return true or false, on whether item is in cart
  let x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });
  //returns a value if it is able to find an item or undefined if it is not

  if (x) {
    return false;
  } else {
    return true;
  }
  //is this necessary if I'm using the helper function in a conditional
}

function changeItemQuantity(itemName, cart, newQty){
    //return new cartItems
    //item already in cart, just modify the quantity
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
    //return new cartItems
    let item = pickItemFromShelf(itemName, shelf);
    let updatedCart = [...cart.cartItems, {...item, quantity: newQty}];
    return updatedCart;
}

// function pickItemFromShelf(itemName){
//     //return object
//     return menuItems.find((menuItem) => menuItem.name === itemName);
// }
//needs menuItems database file
//don't know if I should declare it as an argument, but it will crowd addItemToCart since this function is called inside that function
//I just tested it and it seems like I have to pass menuItems explicitly. Even though I exposed the binding globally,
//it seems as though it is not being picked up on.

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