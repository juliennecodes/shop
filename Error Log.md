#Promises

#Where to place fetch
I originally placed the fetch request in the menu item component because I thought it was menuItems component that needed the information. However, because I needed to wait for the information in the fetch request, I needed a loading component. It was a bit awkward to have the conditional rendering of true? menuItems : loading in the menuItems component. I thought it was cleaner to place the fetch request in the menu component even if the information has to be passed down by a component that doesn't directly need it. It made menuItems more concise even if the information wasn't directly available. It was just focused on mapping through the information.

#Images
I had trouble with images. I thought it was because I wasn't writing the paths correctly, in the sense of navigation from one folder to the next. I eventually figured it out that I had the wrong filename. I thought the files were jpegs, they were jpgs. I still have to find out how to organize database files though. I'm not sure if placing the images in the public folder is the proper way.