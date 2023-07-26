import { render, waitFor, screen } from "@testing-library/react";
import PostPage from "./Post";
import userEvent from "@testing-library/user-event";
import { CommuteProvider } from "../contexts/CommuteProvider";
import * as dataSetHooks from "../hooks/useDataSet";
import { MOCK_MAPPED_STOP } from "../utils/testHelpers";

const mockedNavigateFn = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigateFn,
}));

describe("PostPage", () => {
  it("should render the Post form page correctly", () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [MOCK_MAPPED_STOP],
      stopById: () => MOCK_MAPPED_STOP,
    }));

    render(
      <CommuteProvider>
        <PostPage />
      </CommuteProvider>
    );

    expect(screen.getByText("New connection")).toBeVisible();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeVisible();
    expect(screen.getAllByTestId("select")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /save/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
  });

  it("should navigate to home commute page if save button clicked", async () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [MOCK_MAPPED_STOP],
      stopById: () => MOCK_MAPPED_STOP,
    }));

    render(
      <CommuteProvider>
        <PostPage />
      </CommuteProvider>
    );

    await userEvent.type(
      screen.getByRole("textbox", { name: /name/i }),
      "name"
    );
    const selects = screen.getAllByTestId("select");
    expect(selects).toHaveLength(3);

    await userEvent.selectOptions(selects[0], "mock-stop-id");
    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockedNavigateFn).toBeCalledTimes(1);
    });
    expect(mockedNavigateFn).toBeCalledWith("/home-commute");
  });

  it("should navigate to home page if cancel button clicked", async () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [MOCK_MAPPED_STOP],
      stopById: () => MOCK_MAPPED_STOP,
    }));

    render(
      <CommuteProvider>
        <PostPage />
      </CommuteProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockedNavigateFn).toBeCalledTimes(1);
    expect(mockedNavigateFn).toBeCalledWith("/");
  });
});
