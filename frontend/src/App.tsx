import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EstimateRide from "./pages/EstimateRide";
import RideOptions from "./pages/RideOptions";
import RideHistory from "./pages/RideHistory";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EstimateRide />} />
        <Route path="/ride-options" element={<RideOptions />} />
        <Route path="/ride-history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
