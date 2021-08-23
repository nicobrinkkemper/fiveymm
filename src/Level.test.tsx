import React from "react";
import { render, screen } from "@testing-library/react";
import { AppWrapper } from "./AppWrapper";
import { createMemoryHistory } from "history";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/level/1/1"
  })
}));

test("renders Next Level Button", () => {
  const history = createMemoryHistory();
  history.push("/level/1/1");
  render(<AppWrapper />);
  const linkElement = screen.getByText(/Next level/i);
  expect(linkElement).toBeInTheDocument();
});
