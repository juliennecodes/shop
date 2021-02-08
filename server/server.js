const {menuItems} = require('./database-cafe');
const express = require('express');
const { Cart } = require('./cart');
const app = express();
/*--------------------------------------------------------------

--------------------------------------------------------------*/
let cart = {
    cartItems: {},
    subtotal: 0,
    tax: 0,
    total: 0
}


/*--------------------------------------------------------------

--------------------------------------------------------------*/
app.use(express.json());

app.get('/menu', (req, res) => {
    console.log('get request made');
    res.json(menuItems);
});

app.get('/cart', (req, res)=> {
    console.log('get request to cart made');
    res.json(cart);
});

app.post('/cart', (req, res)=>{
    const itemName = req.body.itemName;
    const updateQuantity = req.body.itemQuantity;

    //this sends an updated cart to the client
    //server uses information from post request to update data accordingly

    //so there has to be a cart object that gets updated in the server
    
    //if item is in cart, update quantity
    //if item is not in cart and quantity is to increased, add item to cart
    //it item is not in cart and quantity is to be decreased, don't do anything

    //create a new cart based on the updated cart items - const updatedCart = newCart(updatedCartItems);
    //then update the cart object - so the get request can have an updated value also
    //cart = {
        // cartItems: classCart.cartItems;
        // subtotal: classCart.subtotal;
        // tax: classCart.tax;
        // total: classCart.total;
    // }

    // res.json(updatedCart);


});


app.listen(8000, ()=> console.log('listening at port 8000'));