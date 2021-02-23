class Cart {
  constructor(cartItems = []) {
    this.cartItems = cartItems;
    this.taxRate = 0.13;
  }

  get subtotal() {
    const cartItems = this.cartItems;

    const subtotals = cartItems.map(
      (cartItem) => cartItem.price * cartItem.quantity
    );

    return subtotals.reduce((subtotal, current) => current + subtotal, 0);
  }

  get tax() {
    return this.subtotal * this.taxRate;
  }

  get total() {
    return this.subtotal + this.tax;
  }

  updateCart(menuItem, newQty) {
    if (isInCart(this, menuItem.name)) {
      const updatedCartItems = changeItemQuantity(this, menuItem.name, newQty);
      return new Cart(updatedCartItems);
    }

    if (isNotInCart(this, menuItem.name) && newQty > 0) {
      const updatedCartItems = addItemToCart(this, menuItem, newQty);
      return new Cart(updatedCartItems);
    } else {
      return this;
    }
  }

  removeItem(menuItem){
    if (isInCart(this, menuItem.name)) {
      const cartItems = this.cartItems;
      const updatedCartItems = cartItems.filter(
        (cartItem) => !(cartItem.name === menuItem.name)
      );
      return new Cart(updatedCartItems);
    } else {
      return this;
    }
  }
  toJSON(){
    return {
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
    }
  }
}

function changeItemQuantity(cart, itemName, newQty) {
  const updatedCart = cart.cartItems.map((cartItem) => {
    if (cartItem.name === itemName) {
      return { ...cartItem, quantity: cartItem.quantity + newQty };
    } else {
      return cartItem;
    }
  });

  return updatedCart.filter((cartItem) => cartItem.quantity > 0);
}

function addItemToCart(cart, item, newQty) {
  return [...cart.cartItems, { ...item, quantity: newQty }];
}

function isInCart(cart, itemName) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  //   if (x) {return true;} else {return false;}
  if (x) return true;
  else return false;
}

function isNotInCart(cart, itemName) {
  const x = cart.cartItems.find((cartItem) => {
    return cartItem.name === itemName;
  });

  //   if (x) {return false;} else {return true;}
  if (x) return false;
  else return true;
}

exports.Cart = Cart;
