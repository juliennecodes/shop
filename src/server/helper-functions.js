function pickItemFromMenu(itemName, menu) {
  return menu.find((menuItem) => menuItem.name === itemName);
}

function convertToCartObject(cart) {
  return {
    cartItems: [...cart.cartItems],
    subtotal: cart.subtotal,
    tax: cart.tax,
    total: cart.total,
  };
}


exports.pickItemFromMenu = pickItemFromMenu;
exports.convertToCartObject = convertToCartObject;
