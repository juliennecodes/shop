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

  changeItemQuantity(menuItem, newQty) {
    const updatedCart = this.cartItems.map((cartItem) => {
      if (cartItem.name === menuItem.name) {
        return { ...cartItem, quantity: cartItem.quantity + newQty };
      } else {
        return cartItem;
      }
    });

    return updatedCart.filter((cartItem) => cartItem.quantity > 0);
  }

  addItemToCart(menuItem, newQty) {
    return [...this.cartItems, { ...menuItem, quantity: newQty }];
  }

  contains(menuItem) {
    const x = this.cartItems.find((cartItem) => {
      return cartItem.name === menuItem.name;
    });

    //   if (x) {return true;} else {return false;}
    if (x) return true;
    else return false;
  }

  updateCart(menuItem, newQty) {
    if (this.contains(menuItem)) {
      const updatedCartItems = this.changeItemQuantity(menuItem, newQty);
      return new Cart(updatedCartItems);
    }

    if (!this.contains(menuItem) && newQty > 0) {
      const updatedCartItems = this.addItemToCart(menuItem, newQty);
      return new Cart(updatedCartItems);
    } else {
      return this;
    }
  }

  removeItem(menuItem) {
    if (this.contains(menuItem)) {
      const cartItems = this.cartItems;
      const updatedCartItems = cartItems.filter(
        (cartItem) => !(cartItem.name === menuItem.name)
      );
      return new Cart(updatedCartItems);
    } else {
      return this;
    }
  }
  toJSON() {
    return {
      cartItems: this.cartItems,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
    };
  }
}

exports.Cart = Cart;
