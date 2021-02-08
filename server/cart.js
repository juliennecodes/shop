class Cart {
  constructor(cartItems) {
    this.cartItems = cartItems;
    this.taxRate = 0.13;
  }

  get subtotal() {
    const cartItems = this.cartItems;

    const subtotals = cartItems.map(
      (cartItem) => cartItem.price * cartItem.quantity
    );

    return subtotals.reduce((current, subtotal) => current + subtotal);
  }

  get tax(){
    return this.subtotal * this.taxRate;
  }

  get total(){
      return this.subtotal + this.tax;
  }
}

exports.Cart = Cart;
