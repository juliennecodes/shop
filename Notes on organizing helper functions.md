updateCart is concerned with updating the cart object.

isInCart is concerned with seeing whether the item is one of the cartItems

isNotInCart is concerned with seeing whether the item is not one of the cartItems

changeItem quantity is concerned with modifying the cart

addItemToCart modifies the cart as well

pickItemFromMenu is a helper function to those modifying the cart.
    - it picks the item from the menu and takes its properties
    - the properties are name, price, category, imageLocation
    - when the item is added to cart, it gains the property of quantity

convert to cart object is also a helper function in that it formats the object instance of cart class, which has the cartitems as property and calculates the subtotal, tax, and total through get.

removeItem modifies the cart

