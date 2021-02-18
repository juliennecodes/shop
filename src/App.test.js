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
  screen.debug();

  const linkToMenu = screen.getByRole('link', {name: 'Menu'});

  await waitFor(()=> screen.findByText(/cup jelly/i));
  screen.debug();
  
  const addToCartButtons = screen.getAllByRole('button', {name: 'Add to Cart'});

  userEvent.click(addToCartButtons[0]);
  userEvent.click(addToCartButtons[1]);
  
  const linkToCart = screen.getByRole("link", { name: "Cart" });

  userEvent.click(linkToCart);
  await waitFor(() => screen.findByText(/cup jelly/i));
  await waitFor(() => screen.findByText(/custard/i));

  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  expect(screen.getByText(/custard/i)).toBeInTheDocument();
  expect(screen.getByText(/Order Summary/)).toBeInTheDocument();
  expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
  expect(screen.getByText(/Tax/)).toBeInTheDocument();
  expect(screen.getByText(/Total/)).toBeInTheDocument();
});
//weird, why is this test passing? I didn't click on linkToMenu but the test was able to find cup jelly and add to cart buttons
//that shouldn't be available in the homepage, which is where the user is without clicking link to menu
//this test shouldn't pass so why is it passing?
//Oh, I did screen.debug and it seems like the homepage leads to the menupage directly? Like '/' renders menu component :S
//I tried adding exact attribute in the routes for menu and cart but that didn't change anything

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
  await waitFor(()=> screen.findByText(/2\.26/));
  
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();
  expect(screen.getByText(/2\.26/)).toBeInTheDocument();

  const decreaseButton = screen.getByRole("button", {
    name: /decreaseQtyButton/i,
  });
  
  userEvent.click(decreaseButton);
  await waitFor(() => screen.getByText(/1\.13/));
  
  expect(screen.getByText(/1\.13/)).toBeInTheDocument();
});

test("when user clicks - and it reaches 0, the item is removed from the cart page", async () => {
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
  
  expect(screen.getByText(/cup jelly/i)).toBeInTheDocument();

  const decreaseButton = screen.getByRole("button", {
    name: "decreaseQtyButton",
  });
  
  userEvent.click(decreaseButton);
  await waitForElementToBeRemoved(() => screen.queryByText(/cup jelly/i));

  expect(screen.queryByText(/cup jelly/i)).not.toBeInTheDocument();
  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  //Do I add this, what if there are other items? or is it fine because it makes sense in this context?
});

test("when the user clicks x in the cart page, the item is removed from the cart page", async () => {
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
