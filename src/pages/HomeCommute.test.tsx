import { render, screen } from "@testing-library/react";
import HomeCommute from "./HomeCommute";
import userEvent from "@testing-library/user-event";
import { CommuteProvider } from "../contexts/CommuteProvider";
import * as commuteContextHooks from "../contexts/CommuteContext";
import * as dataSetHooks from "../hooks/useDataSet";
import { MOCK_MAPPED_STOP } from "../utils/testHelpers";

const mockedNavigateFn = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigateFn,
}));

describe("HomeCommute", () => {
  it("should render the home commute page with one commute card", () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [],
      stopById: () => MOCK_MAPPED_STOP,
    }));
    jest
      .spyOn(commuteContextHooks, "useCommuteContext")
      .mockImplementation(() => ({
        connection: {
          title: "title",
          stops: [MOCK_MAPPED_STOP.id],
        },
        updateConnection: () => jest.fn(),
      }));

    render(
      <CommuteProvider>
        <HomeCommute />
      </CommuteProvider>
    );

    expect(screen.getByText("Home Commute")).toBeVisible();
    expect(screen.getAllByTestId("commute-card")).toHaveLength(1);
    expect(screen.getByRole("button", { name: /back/i })).toBeVisible();
  });

  it("should render the home commute with empty text", () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [],
      stopById: () => MOCK_MAPPED_STOP,
    }));
    jest
      .spyOn(commuteContextHooks, "useCommuteContext")
      .mockImplementation(() => ({
        connection: null,
        updateConnection: () => jest.fn(),
      }));

    render(
      <CommuteProvider>
        <HomeCommute />
      </CommuteProvider>
    );

    expect(screen.getByText("Home Commute")).toBeVisible();
    expect(screen.getByText("There is no my commute now")).toBeVisible();
    expect(screen.getByRole("button", { name: /back/i })).toBeVisible();
  });

  it("should navigate to home page if back button clicked", async () => {
    jest
      .spyOn(commuteContextHooks, "useCommuteContext")
      .mockImplementation(() => ({
        connection: null,
        updateConnection: () => jest.fn(),
      }));

    render(
      <CommuteProvider>
        <HomeCommute />
      </CommuteProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: /back/i }));

    expect(mockedNavigateFn).toBeCalledTimes(1);
    expect(mockedNavigateFn).toBeCalledWith("/");
  });
});
