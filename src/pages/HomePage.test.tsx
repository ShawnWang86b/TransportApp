import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import userEvent from "@testing-library/user-event";

const mockedNavigateFn = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigateFn,
}));

describe("HomePage", () => {
  it("should render the Home page correctly", () => {
    render(<HomePage />);

    expect(screen.getByText("My connections")).toBeVisible();
    expect(screen.getByText("Home commute")).toBeVisible();
    expect(screen.getByRole("button", { name: /add new/i })).toBeVisible();
  });

  it("should navigate to home commute page if home commute clicked", async () => {
    render(<HomePage />);

    const homeCommute = screen.getByText("Home commute");
    expect(homeCommute).toBeVisible();

    await userEvent.click(homeCommute);

    expect(mockedNavigateFn).toBeCalledTimes(1);
    expect(mockedNavigateFn).toBeCalledWith("/home-commute");
  });

  it("should navigate to form page if add new button clicked", async () => {
    render(<HomePage />);

    const addNewButton = screen.getByRole("button", { name: /add new/i });
    expect(addNewButton).toBeVisible();

    await userEvent.click(addNewButton);

    expect(mockedNavigateFn).toBeCalledTimes(1);
    expect(mockedNavigateFn).toBeCalledWith("/post");
  });
});
