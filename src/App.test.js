import App from "./App";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/mock-server";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => {
  resetCartValue();
  server.resetHandlers();
});
afterAll(() => server.close());

// beforeEach(() => server.listen());
// afterEach(() => server.close());

test("menu items are rendered", async () => {
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findByText(/cup jelly/i));
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  expect(screen.getByText(/1/)).toBeInTheDocument();
});

test("cart shows cart items", async () => {
  render(<App />);
  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/order summary/i));

  expect(screen.getByText(/Order Summary/)).toBeInTheDocument();
  expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
  expect(screen.getByText(/Tax/)).toBeInTheDocument();
  expect(screen.getByText(/Total/)).toBeInTheDocument();
});

test("when user clicks add to cart button, item is added to cart", async () => {
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findAllByRole("button", { name: "Add to Cart" }));
  const addToCartButtons = screen.getAllByRole("button", {
    name: "Add to Cart",
  });
  userEvent.click(addToCartButtons[0]);

  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/cup jelly/i));
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
});

test("when user clicks + in the cart page, item quantity increases by one", async () => {
  //render app
  //wait for cart items to show up
  //get a reference to the increase button
  //expect that the item quantity is 1
  //click the increase button
  //expect that the item quantity is 2
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findAllByRole("button", { name: "Add to Cart" }));
  const addToCartButtons = screen.getAllByRole("button", {
    name: "Add to Cart",
  });
  userEvent.click(addToCartButtons[0]);

  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/cup jelly/i));
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  // const increaseButton = screen.getByLabelText(/increaseQtyButton/);
  const increaseButton = screen.getByRole("button", {
    name: /increaseQtyButton/i,
  });
  userEvent.click(increaseButton);
  await waitFor(() => screen.findByText(/2\.26/i));
  expect(screen.getByText(/2\.26/)).toBeInTheDocument();
});

test("when user clicks - in the cart page, item quantity decreases by one", async () => {
  //render app
  //wait for cart items to show up
  //get a reference to the decrease button
  //expect that the item quantity is 3
  //click the decrease button
  //expect that the item quantity is 2
  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findByText(/cup jelly/i));
  const addToCartButtons = screen.getAllByRole("button", {
    name: "Add to Cart",
  });
  userEvent.click(addToCartButtons[0]);
  userEvent.click(addToCartButtons[0]);

  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/cup jelly/i));
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  expect(screen.getByText(/2\.26/)).toBeInTheDocument();

  const decreaseButton = screen.getByRole("button", {
    name: /decreaseQtyButton/i,
  });
  userEvent.click(decreaseButton);
  await waitFor(()=>screen.getByText(/1\.13/));
  expect(screen.getByText(/1\.13/)).toBeInTheDocument();
});

test("when user clicks - and it reaches 0, the item is removed from the cart page", async() => {
  //render app
  //wait for cart items to show up
  //get a reference to the decrease button
  //expect that the item is there
  //click the decrease button
  //expect that the item is not there
  render(<App />);
  const linkToMenu = screen.getByRole('link', {name: 'Menu'});
  userEvent.click(linkToMenu);
  await waitFor(()=> screen.findByText(/cup jelly/i));
  const addToCartButtons = screen.getAllByRole('button', {name: 'Add to Cart'});
  userEvent.click(addToCartButtons[0]);

  const linkToCart = screen.getByRole('link', {name: 'Cart'});
  userEvent.click(linkToCart);

  await waitFor(()=> screen.findByText(/cup jelly/i));
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();

  const decreaseButton = screen.getByRole('button', {name: 'decreaseQtyButton'});
  userEvent.click(decreaseButton);

  await waitForElementToBeRemoved(()=> screen.queryByText(/cup jelly/i));

  expect(screen.queryByText(/cup jelly/i)).not.toBeInTheDocument();
  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  //Do I add this, what if there are other items? or is it fine because it makes sense in this context?



});

test("when the user clicks x in the cart page, the item is removed from the cart page", async () => {
  //render app
  //wait for cart items to show up
  //get a reference to the close button
  //click the close button
  //expect that the cart item is not there

  render(<App />);
  const linkToMenu = screen.getByRole("link", { name: "Menu" });
  userEvent.click(linkToMenu);
  await waitFor(() => screen.findByText(/cup jelly/i));
  const addToCartButtons = screen.getAllByRole("button", {
    name: "Add to Cart",
  });
  userEvent.click(addToCartButtons[0]);
  const linkToCart = screen.getByRole("link", { name: "Cart" });
  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/cup jelly/i));
  const removeButton = screen.getByLabelText(/removeButton/);

  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  userEvent.click(removeButton);

  await waitForElementToBeRemoved(() => screen.getByText(/cup jelly/i));

  expect(screen.queryByText(/cup jelly/i)).not.toBeInTheDocument();
});

//--------------------
function resetCartValue() {
  fetch("/reset")
    .then((res) => res.json())
    .then((serverResponse) => serverResponse);
}
