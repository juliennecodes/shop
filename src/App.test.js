import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("menu items are rendered", async () => {
  render(<App />);

//   await waitFor(() => screen.findByText(/cafe/i));
//   I included this because I wasn't sure if the error was from the mock server
//   I included a sure fire text that should be in the screen
//   if the error still persists, the error isn't entirely because of the mock server
//   cafe should definitely be found regardless of what requests are being made to the server
//   so if it isn't then, there is something wrong with the query, which turned out to be the i
  await waitFor(() => screen.findByText(/juice/i));

//   expect(screen.getByText(/cafe/i)).toBeInTheDocument();
  expect(screen.getByText(/juice/i)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
//   expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();

  screen.debug();
});
