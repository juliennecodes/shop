import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/mock-server";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("menu items are rendered", async () => {
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findByText(/red bean bread/i));
  expect(screen.getByText(/red bean bread/i)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
});

test("cart shows cart items", async () => {
  render(<App />);
  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/red bean bread/i));

  expect(screen.getByText(/red bean bread/i)).toBeInTheDocument();
  expect(screen.getByText(/Total/)).toBeInTheDocument();
  expect(screen.getByText(/5\.65/)).toBeInTheDocument();
});

test("when user clicks add to cart button, item is added to cart", async () => {
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findByRole("button", { name: "Add to Cart" }));
  const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
  userEvent.click(addToCartButton);

  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  //in a normal server, the cart would retain state
  //however in the mock server, this is making a get request to the cart page
  //making the add to cart action, which is a post request,  meaningless
  await waitFor(()=> screen.findByText(/16\.94/));
  screen.debug();
  //oh wait it works? why? 
  //oh right, app makes the get request only once
  //further changes to the cart is made through post requests
  //I think I was thinking of page changes as browsers making get requests, like how browsers would request a page
  //like when you go to the cart page, you get request to the cart endpoint
  //in this case, app just renders the component with already existing information
  //app keeps a state and the components such as menu and cart display UI according to that data
  expect(screen.getByText(/16\.94/)).toBeInTheDocument();
});
//This is hard to test because I have to go to the cart page to prove that the item is there
//However by doing so, I make a get request to the cart endpoint, which at my current msw setup isn't really proving that
//when user clicks add to card button, item is added to cart.
//it's just proving that get request to the cart works

// test("when user clicks + in the cart page, item quantity increases by one", async () => {
//   server.close(); //just to make sure there msw and jest won't conflict

//   const updatedCart = {
//     cartItems: [
//       {
//         name: "Red Bean Bread",
//         quantity: 3,
//       },
//     ],
//     subtotal: 15,
//     tax: 1.94,
//     total: 16.94,
//   };

//   jest.spyOn(global, "fetch").mockResolvedValue({
//     json: jest.fn().mockResolvedValue(updatedCart),
//   });
// });

test("when user clicks + in the cart page, item quantity increases by one", async () => {
  //render app
  //wait for cart items to show up
  //get a reference to the increase button
  //expect that the item quantity is 1
  //click the increase button
  //expect that the item quantity is 2
});

test("when user clicks - in the cart page, item quantity decreases by one", () => {
  //render app
  //wait for cart items to show up
  //get a reference to the decrease button
  //expect that the item quantity is 3
  //click the decrease button
  //expect that the item quantity is 2
});

test("when user clicks - and it reaches 0, the item is removed from the cart page", () => {
  //render app
  //wait for cart items to show up
  //get a reference to the decrease button
  //expect that the item is there
  //click the decrease button
  //expect that the item is not there
});

test("when the user clicks x in the cart page, the item is removed from the cart page", () => {
  //render app
  //wait for cart items to show up
  //get a reference to the close button
  //click the close button
  //expect that the cart item is not there
});
