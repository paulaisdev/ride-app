import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { estimateRide } from "../services/rideService";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { v4 as uuidv4 } from "uuid";
import "./../styles/pages/_estimateRide.scss";

const libraries: ("places")[] = ["places"];

const EstimateRide: React.FC = () => {
  const [customer_id, setCustomerId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    const cachedCustomerId = localStorage.getItem("customer_id");
    if (cachedCustomerId) {
      setCustomerId(cachedCustomerId);
    } else {
      const newCustomerId = uuidv4();
      localStorage.setItem("customer_id", newCustomerId);
      setCustomerId(newCustomerId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customer_id || !origin || !destination) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await estimateRide({ customer_id, origin, destination });
      navigate("/ride-options", {
        state: {
          origin,
          destination,
          distance: response.distance,
          duration: response.duration,
          options: response.options,
          customerId: customer_id,
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error_description || "An error occurred");
    }
  };

  if (!isLoaded) return <p>Carregando...</p>;

  return (
    <div className="estimate-ride">
      <header className="header">
        <h1>Selecione o endereço</h1>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Autocomplete
            onPlaceChanged={() => {
              const input = document.getElementById("origin") as HTMLInputElement;
              if (input) setOrigin(input.value);
            }}
          >
            <input id="origin" type="text" placeholder="Origem" />
          </Autocomplete>
        </div>
        <div className="input-group">
          <Autocomplete
            onPlaceChanged={() => {
              const input = document.getElementById("destination") as HTMLInputElement;
              if (input) setDestination(input.value);
            }}
          >
            <input id="destination" type="text" placeholder="Destino" />
          </Autocomplete>
        </div>
        <button type="submit" className="submit-button">Estimate</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EstimateRide;
