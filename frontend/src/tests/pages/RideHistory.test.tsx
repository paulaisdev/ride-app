import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EstimateRide from "../../pages/EstimateRide";
import { mockRideEstimate } from "../fixtures/estimateRideData";

describe("EstimateRide Component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRideEstimate),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the estimate form and displays results on submission", async () => {
    render(
      <Router>
        <EstimateRide />
      </Router>
    );

    // Check form fields exist
    expect(screen.getByPlaceholderText("Origin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Destination")).toBeInTheDocument();

    // Simulate API response
    expect(await screen.findByText(/Distance: 10.5 km/i)).toBeInTheDocument();
    expect(await screen.findByText(/Duration: 15 mins/i)).toBeInTheDocument();
    expect(await screen.findByText(/Standard/i)).toBeInTheDocument();
    expect(await screen.findByText(/BMW 5 Series/i)).toBeInTheDocument();
  });
});
