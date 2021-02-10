import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test.skip('menu items are rendered', async () => {
  render(<App />);
  await waitFor(() => screen.findByText(/juice/i));

  expect(screen.getByText(/juice/i)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
});

test.skip('cart shows cart items', async()=>{
    render(<App/>);
    
    await waitFor(()=> screen.findByText(/sandwich/i));

    expect(screen.getByText(/sandwich/i)).toBeInTheDocument();
    expect(screen.getByText(/Total/)).toBeInTheDocument();
    expect(screen.getByText(/5\.65/)).toBeInTheDocument();
});

test.skip('when user clicks add to cart button, item is added to cart', async()=>{
    render(<App/>);
    await waitFor(()=> screen.findByRole('button', {name: 'Add to Cart'}));
    const addToCartButton = screen.getByRole('button', {name: 'Add to Cart'});

    expect(screen.queryByText(/3\.39/)).not.toBeInTheDocument();

    userEvent.click(addToCartButton);
    await waitFor(()=> screen.findByText(/3\.39/));

    expect(screen.getByText(/red bean bread/i)).toBeInTheDocument();
    screen.debug();
    expect(screen.getByText(/Subtotal/)).toBeInTheDocument();
    // expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/Tax/)).toBeInTheDocument();
    // expect(screen.getByText(/\.39/)).toBeInTheDocument();
    expect(screen.getByText(/Total/)).toBeInTheDocument();
    expect(screen.getByText(/3\.39/)).toBeInTheDocument();
});