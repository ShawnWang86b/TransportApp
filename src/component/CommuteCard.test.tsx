import { render, screen } from "@testing-library/react";
import { CommuteCard } from "./CommuteCard";
import * as dataSetHooks from "../hooks/useDataSet";
import { MOCK_MAPPED_STOP } from "../utils/testHelpers";

describe("CommuteCard", () => {
  it("should render the commute card correctly", () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [],
      stopById: () => MOCK_MAPPED_STOP,
    }));

    render(<CommuteCard stopId="mock-stop-id" />);

    expect(screen.getByTestId("commute-card")).toBeVisible();
    expect(screen.getByText("Clarendon")).toBeVisible();
    expect(screen.getByText("Towards East Coburg")).toBeVisible();
    expect(screen.getByTestId("icon-tram")).toBeVisible();
  });

  it("should not render the commute card if no stop find by id", () => {
    jest.spyOn(dataSetHooks, "useDataSet").mockImplementation(() => ({
      stopList: [],
      stopById: () => undefined,
    }));

    render(<CommuteCard stopId="mock-stop-id" />);
    expect(screen.queryByTestId("commute-card")).not.toBeInTheDocument();
  });
});
