import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RideOptions from "../../pages/RideOptions";
import { mockRideOptions } from "../fixtures/rideOptionsData";

describe("RideOptions Component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ options: mockRideOptions }),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders ride options correctly", async () => {
    render(
      <Router>
        <RideOptions />
      </Router>
    );

    // Verify the mock data is displayed
    expect(await screen.findByText(/Standard/i)).toBeInTheDocument();
    expect(await screen.findByText(/BMW 5 Series/i)).toBeInTheDocument();
    expect(await screen.findByText(/Luxury experience/i)).toBeInTheDocument();
    expect(await screen.findByText(/$15.00/i)).toBeInTheDocument();
    expect(await screen.findByText(/$30.00/i)).toBeInTheDocument();
  });
});
