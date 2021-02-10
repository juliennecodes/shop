#Promises
-you can deal with promises by either await, which waits for the promise to resolve
-or you can use then, which does something with the value inside the promise object

#Where to place fetch
-I originally placed the fetch request in the menu item component because I thought it was menuItems component that needed the information. However, because I needed to wait for the information in the fetch request, I needed a loading component. It was a bit awkward to have the conditional rendering of true? menuItems : loading in the menuItems component. I thought it was cleaner to place the fetch request in the menu component even if the information has to be passed down by a component that doesn't directly need it. It made menuItems more concise even if the information wasn't directly available. It was just focused on mapping through the information.

#Images
-I had trouble with images. I thought it was because I wasn't writing the paths correctly, in the sense of navigation from one folder to the next. I eventually figured it out that I had the wrong filename. I thought the files were jpegs, they were jpgs. I still have to find out how to organize database files though. I'm not sure if placing the images in the public folder is the proper way.

#Test environment and servers
-Error: connect ECONNREFUSED
-TypeError: Network request failed
-Nevermind, I think the error was in the regex. I didn't include the i, which maybe timed out my waitFor code. Since the test wasn't finding the specified text.
-I added process.env.NODE_ENV = 'test'; in the test file in conjunction with assigning the port number depending on whether it is a test environment or not in the server file. I took it out again though. I'm not familiar enough with what it is doing to really add it. It works with or without it. I'll maybe read up on it later.

#How do I deal with tests?
-I provided specific values in the mock service worker. Should I replicate those mocked values in the test environment also? Should I use bindings in place of hardcoded information? But then, that might look too clunky. You always have to look up what menuItems[0].name is

#Found multiple elements with the role "button" and name "Add to Cart"
-So far, I've only been testing one button as an input to a user action, such as start timer, and add task to to-do list
-Because there are multiple items on sale and I'm only testing for one of the items, I forgot that multiple elements can be gotten when I do a query search for button with the name, 'add to cart'.
-I'm going to comment it out for now. I'm not sure what the solution is
-I might have trouble when I need to click a specific button
-I'd rather not add data test id
-But if all you're proving is that the add to cart works, maybe just send one menu item back from the mock server
-It might be irrelevant that there are multiple buttons with the same purpose

#How do you break the little steps when so many actions are bundled together in that little step
- i.e adding item to cart - you have to set up the server, the fetching of the cartItems, the updating of the cartItems, the mock server for testing, the test, then router - well maybe you can leave this one for now
- solution - draw a sequence diagram with each player's and their roles and actions separated
- where to start when so many moving parts are intertwined?

#Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
-I'm rendering the app and initially set the cart state to null. It will take some time to fetch the cart value so I put it in a useEffect. The app will request the cart from the server. So timeline is, app renders, after the first render, useEffect takes place, and rerenders the component. However, the server response hasn't been received yet and when it is processed, the cart state from the previous component is already gone. Hmmm. useRef?
-I found a solution online. It was by creating a cleanup. It says to only set the state when the boolean is true. However, I'm not quite sure how async works. I thought it is set aside until it is resolved. Meanwhile, you move on to the next line. If so, doesn't the code reach the part where you set the boolean to false, making set state not work. Is it all just a matter of timing then, like, can you set this value fast enough? How is the cleanup working really? Doesn't the function and its variables get discarded afterwards, anyways? what does it matter if a binding is holding onto whether it is true or not. What does it matter if the binding remains true when the function finishes? How exactly is that a cleanup? You only set the state once, it isn't like you're repeatedly setting it at an interval.

#To copy an object, except for one property, you can map and just create an object with those properties and use the current element for its values
const inventory = menuItems.map((menuItem)=> {
    return {
        name: menuItem.name,
        price: menuItem.price,
        category: menuItem.category,
    }
})
-didn't copy image location
-oh maybe I actually do need the image for the cart

#Too complicated
I had the function add to cart but it was too messy and too complicated and it was hard to start. What helped was actually writing down what I wanted to happen in plain descriptive words. Even though the functions didn't exist yet, the general concept is there to help simplify things.
    function addItemToCart(itemName, cart, newQty) {
    // return cart
    let cartItems = cart.cartItems;

    if (isInCart(itemName, cart)) {
        changeItemQuantity();
    } 

    if(isNotInCart(itemName, cart) && newQty > 0){
        addNewItemToCart();
    }
    }