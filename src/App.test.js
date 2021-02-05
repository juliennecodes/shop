import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("menu items are rendered", async () => {
  render(<App />);
  await waitFor(() => screen.findByText(/juice/i));

  expect(screen.getByText(/juice/i)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
});
