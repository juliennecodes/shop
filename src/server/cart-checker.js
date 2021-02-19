function isInCart(itemName, cart) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  //   if (x) {return true;} else {return false;}
  if (x) return true;
  else return false;
}

function isNotInCart(itemName, cart) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  //   if (x) {return false;} else {return true;}
  if (x) return false;
  else return true;
}

function removeZeroQuantityItems(cartItems){
  return cartItems.filter(
    (cartItem) => cartItem.quantity > 0
  )
};

exports.isInCart = isInCart;
exports.isNotInCart = isNotInCart;
exports.removeZeroQuantityItems = removeZeroQuantityItems;