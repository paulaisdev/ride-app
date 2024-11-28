import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRideHistory } from "../services/rideService";
import { getDrivers } from "../services/driverService";
import { format } from "date-fns";
import "./../styles/pages/_rideHistory.scss";

const RideHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [rides, setRides] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedCustomerId = localStorage.getItem("customer_id");
    if (cachedCustomerId) {
      setCustomerId(cachedCustomerId);
      loadRides(cachedCustomerId);
    }
    loadDrivers();
  }, []);

  const loadRides = async (id: string) => {
    setLoading(true);
    try {
      const data = await getRideHistory(id, driverId);
      setRides(data.rides);
    } catch (err: any) {
      setError(err.response?.data?.error_description || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const loadDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (err: any) {
      console.error("Failed to load drivers:", err);
    }
  };

  const handleSearch = async () => {
    if (!customerId) {
      setError("Customer ID is required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = await getRideHistory(customerId, driverId);
      setRides(data.rides);
    } catch (err: any) {
      setError(err.response?.data?.error_description || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ride-history">
      <header className="ride-history-header">
        <button className="back-button" onClick={() => navigate("/")}>←</button>
        <h1>Histórico de Corridas</h1>
      </header>
      <div className="tabs">
        <button className="tab">Agendadas</button>
        <button className="tab active">Finalizadas</button>
        <button className="tab">Canceladas</button>
      </div>
      <div className="ride-history-filters">
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <select
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        >
          <option value="">Selecione motorista (optional)</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Procurar</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Carregando...</p>}
      <div className="ride-list">
        {rides.map((ride) => (
          <div className="ride-item" key={ride.id}>
            <div className="ride-item-header">
              <h3>{ride.driver.name}</h3>
              <span>{ride.driver.vehicle}</span>
            </div>
            <div className="ride-item-details">
              <p>
                <strong>Date:</strong>{" "}
                {ride.date
                  ? format(new Date(ride.date), "dd/MM/yyyy HH:mm:ss")
                  : "Invalid Date"}
              </p>
              <p>
                <strong>Origem:</strong> {ride.origin}
              </p>
              <p>
                <strong>Destino:</strong> {ride.destination}
              </p>
              <p>
                <strong>Valor:</strong> ${ride.value.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideHistory;
