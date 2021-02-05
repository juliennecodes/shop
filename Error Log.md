#Promises

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
