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

#Question on explicit parameters
I wasn't sure if I should depend on global bindings. It seems to work fine but in tests, it seems like it's not registering. Like, in menuItems, the linter isn't complaining that there is an undefined binding. While in test files, even if the binding is available globally, it doesn't register as that. Does it have something to do with the test function? Is it not able to register, hmmm, no that doesn't make sense, it is able to detect helper functions so I don't know. Pasting here in case I forget I asked this.

// function pickItemFromShelf(itemName){
//     //return object
//     return menuItems.find((menuItem) => menuItem.name === itemName);
// }
//needs menuItems database file
//don't know if I should declare it as an argument, but it will crowd addItemToCart since this function is called inside that function
//I just tested it and it seems like I have to pass menuItems explicitly. Even though I exposed the binding globally,
//it seems as though it is not being picked up on.

The reason I wanted to cut down on it was to not crowd the function that was using this function.
-human error, cart and menuItems already declared inside function so those take priority in naming over the global one


#Error missed by test
I had an error where the totals mess up when I try to increase the quantity of an already existing cart item. Tracking it down was a bit of pain since all the tests were passing and it seemed like the functions worked as they should. The error was I missed writing the parameter in updateCart's helper function. It seems obvious now. It was in changeQuantity. However, I did check the actual function instead of the one inside updateCart. I also went to isInCart before I checked updateCart. The test missed the error because while I was adding multiple quantities, I was adding them in one go. So in updateCart, instead of changing item quantity of an already existing cart item, I was actually just adding item to cart. This was in the test for update cart. I think I wrote the other tests fine, maybe.

#Error in rendering component that matches the route path
- "A <Switch> looks through its children <Route>s and renders the first one that matches the current URL."
- Because the route path for the homepage was /, even when I was typing /menu, the homepage was the one being rendered
- I guess it stopped at the slash? To fix it, you have to type exact in the homepage

#Error in querying for button
-The temporary fix for this issue was to just return one item in the mock server. However, in the cart page, there are two buttons, increase and decrease. Sooo, I don't know how to deal with that.
-The temporary fix can be just using the index number in the array returned. I don't think it's a good fix because you can always add buttons and that might mess up the index order.
-Another temporary fix is adding data-test-id
-I looked at an e commerce example that uses the increase and decrease and they have an aria label, maybe that? It might fix this particular multiple button issue but it still doesn't fix the actual multiple button issue - several buttons, such as Add to Cart, matching with the query

#I'm not sure how to do the updateCart testing with msw server. I mean, I can recreate the server logic of updating cart and recalculating the subtotals, tax, and total but it doesn't seem right?
- do I test the calculations in the app or the server?
- the server is doing the calculations so the app is only concerned with displaying the information, but I've already tested displaying the information
- do I test that when you click the button it calls update cart, is that what I need to test?
-My difficulty is I have to set up calculations in msw because the increase and decrease buttons make fetch requests to the same endpoint, unless I hijack it in spyOn? is that possible? modify the endpoint and just have a specialized endpoint handler for each of these actions? oh wait, I think I can do mockResolve instead

#How do you differentiate between different fetch requests when you're planning on hijacking it with spyOn
- I have included jest spyOn that hijacks fetch requests. However, I have both a get request and a post request. Presumably, they will both get hijacked by the same function

#Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one.
- nevermind, it was because I added the router. Now, when app is rendered, the page is on the homepage so I have to navigate to get to the menu page or the cart page
- I think I might have detected this earlier if I didn't add skip to tests
- nevermind the nevermind, I'm getting errors again - replaced the callback inside waitFor from screen.findBy to screen.getBy, I don't know if I have to explicitly do await inside the callback even if the outside function has await already written. Just in case, I replaced it with getBy since waitFor repeatedly calls the callback anyways until it evaluates to true? Or is it it just calls it once and waits for it to evaluate to true :S
-oh I guess I can't do getBy instead of findBy because getBy immediately returns false? error? the documentation says it throws instead of return.
- also, maybe I'm getting errors because I have conflicting information in my msw server
- I differentiated the objects I sent from the server so I can verify that I'm hitting the proper endpoints. While it worked before since the app was only in one page, now that I have dedicated pages, I might get conflicting information from get request to cart and post request to cart

#implement onChange on input
- I'll do an empty callback for now because I have to create a new endpoint for the server and a new function that makes a fetch request to that endpoint

#Why isn't the promise being handled? Isn't await the one handling promises?
-await waitFor(async() => expect(await screen.findByText(/red bean bread/i))).toBeInTheDocument();
-screenshot
-wrong structure

#Trouble with menu items being rendered in test
- I don't know why but I'm having trouble with the menu items being rendered in test
- it works fine on the app, is it msw server that is configured wrong?
- it doesn't seem like the await waitFor because it works fine on the cart, which similarly, makes a get request
- although I'm still getting the error of overlapping act calls - I don't know what that means
- since I think the problem is in fetching the menu items, I put the fetch in its own useEffect. It didn't seem to fix the test though.
- I don't understand, it's configured the same as the get request to cart, the difference is the endpoint, what is being sent, I don't know
-Oh, the error was I wasn't passing the right props, I had menu={menuItems} when it was supposed to be menuItems ={menuItems}
-Contrary to what I thought, it actually wasn't working in the app, so the test, was rightfully complaining
-Consequently, this seems to have gotten rid of the errors I've been getting such as overlapping act calls

#I added the delete feature. I can delete items. However, once I am down to my last item, I can't.
-TypeError: Reduce of empty array with no initial value
    at Array.reduce (<anonymous>)
    at Cart.get subtotal [as subtotal] (/Users/julienne/Documents/Coding/zReact-Apps/shop/src/server/cart.js:14:22)
    at convertToCartObject (/Users/julienne/Documents/Coding/zReact-Apps/shop/src/server/server-helper-functions.js:61:20)
    at removeItem (/Users/julienne/Documents/Coding/zReact-Apps/shop/src/server/server-helper-functions.js:72:12)
    at /Users
-to solve this, I added a condition that it will only return the result of the reduce method if the array is not empty, otherwise, return 0

#I've been using h1s for headings. I forgot to treat the components as just a part of one page. I have been treating them like they are a separate page of their own, hence, their own heading at the level of h1. I ended up having multiple h1s for one page.
- Don't forget that even though they have a dedicated page, they are still part of a bigger page. Their headings will be lower in level.

#I wanted to have the link to the page underlined if the user is currently in the page. I found out that there is a special version of link, which is navlink. It adds styling attributes to the link if the page it links to matches the current url. 
- there was an error. It is solved now but I don't really know what it was. I just clicked what VScode prompted me to, which was to install types of something at react-router-dom, whatever that is
-module "/Users/julienne/Documents/Coding/zReact-Apps/shop/node_modules/react-router-dom/index"
Could not find a declaration file for module 'react-router-dom'. '/Users/julienne/Documents/Coding/zReact-Apps/shop/node_modules/react-router-dom/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-router-dom` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-router-dom';`ts(7016)

#So far, I've only used conditional rendering at one level, meaning there is only one condition and you instruct the program to render one thing or the other depending on the condition. This was necessary for the loading message if the cart data from the server wasn't received just yet. However, I also needed to conditionally render items or the message cart is empty depending on whether there were cart items or not in the cart. It turns out you can nest conditions using ternary operator.

#I was having trouble with the increase button. It's easy to get a button that has a text as a label but it isn't as straightforward it seems to get a button that is an icon. I was getting errors when I was doing testing even though it was working in the app. I was waiting for an element to show up but it wasn't doing that. I'm not sure exactly what was causing the error but it seems to have solved now. I wasn't sure if it was data test id not working? I did change data test id and used aria label instead. It seems you can use the options object with name as the aria label or so it seems. I'll investigate later. 
- I don't know whether I should use getByRole button with options object with name property or getByLabelText. I'm using the latter for the remove button, which seems to pass the test. I used the former for the increaseButton.
- The reason I'm also wondering if it's a server issue is because the total goes to 3.39. It's supposed to be 2.26 since it starts with 1.13. When you add one quantity, it's supposed to be 2.26. However, the error shows that it is 3.39.
-I think it's also bleeding into other tests. Since the cart binding maybe holding onto values. I thought reset handlers takes care of resetting the server but maybe not?
-Okay, it may be the server. My solution for that is creating a new endpoint that resets the cart value so it is like the initial value. Because the value of the cart persists between tests, it has to be reset as well. I think this only applies to the mock server.
-My initial solution to the problem was to do server.close after each test and server.listen before each test. That created an error though -       Error: Error: connect ECONNREFUSED 127.0.0.1:80
-So I made a function that makes a get request to the reset endpoint. However, I'm getting this error.     SyntaxError: Unexpected end of JSON input
        at parse (<anonymous>)
-It's probably because I'm not doing anything with the value received. I configured the mock server to just return a 200 status.
-I console logged the response and I'm still getting an error. Maybe you just can't send 200 status?
-I also flipped the order in case it was that, I had resetHandlers before resetCart and switched it but I'm still getting the error
-The SyntaxError: Unexpected end of JSON input error is fixed. I had to actually send something back instead of just 200 status.
-I got rid of console logging the response and it still works so I guess it is just returning the response

#      Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
          at App (/Users/julienne/Documents/Coding/zReact-Apps/shop/src/App.js:10:27)
             34 |     })
      35 |       .then((res) => res.json())
    > 36 |       .then((updatedCart) => setCart(updatedCart));
         |                              ^
      37 |   };
      38 |
      39 |   const removeItem = (itemName) => {

-Why?!
-I got this error in test when trying to decrease item quantity
-it's solved now probably because some other error resolved itself

#Found multiple elements with the text: /0\.00/
- I had an item go from one quantity to zero. This will show 0.00 in the cart page. However, there are numerous 0.00 in subtotal, tax, and total. I guess I have to some other way to prove that the item decreased? How do I deal with this? Does it matter as long as I'm proving that the item is decreasing?
- for now, I'm going to add two items initially and just show the total decreasing

#what does server.resetHandlers() do?

#Sometimes the test passes and sometimes it does not
- I've been using just one waitFor thinking that the presence of one element meant that the other element meant that the other element would be there as well, but that doesn't seem to be the case. I added the findBy query of the other element just to be on the safe side and it seems to make the tests pass more reliably?

#I might have problems with my test. I just did the thing where you change the value and you know the test is supposed to fail but it passes.
- I changed the regex value and it still passes as long as it contains the strings of cup jelly
- Is there a term for this? What else do you do to check that the test isn't too lax? Just change values around?
- Yeah, I think my tests are too lax, I found a test that shouldn't pass but it is passing

#test("cart shows cart items", async () => {
  render(<App />);
  const linkToMenu = screen.getByRole('link', {name: 'Menu'});
  await waitFor(()=> screen.findByText(/cup jelly/i));
  ...
});
//weird, why is this test passing? I didn't click on linkToMenu but the test was able to find cup jelly and add to cart buttons
//that shouldn't be available in the homepage, which is where the user is without clicking link to menu
//this test shouldn't pass so why is it passing?
//Oh, I did screen.debug and it seems like the homepage leads to the menupage directly? Like '/' renders menu component :S
//I tried adding exact attribute in the routes for menu and cart but that didn't change anything

#Not really an error but more note/question
- I just organized the server-helper-functions. I started off by writing what each function does. A pattern/commonality emerges and then you can use that to group functions together and separate it from the others.
- I still don't know where to place pickItemFromMenu or convertToCartObject other than helper functions
- Is that how you approach organizing and grouping?