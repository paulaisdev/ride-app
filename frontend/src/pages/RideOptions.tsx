import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmRide } from "../services/rideService";

import "./../styles/pages/_rideOptions.scss";

const RideOptions: React.FC = () => {
  const location = useLocation();
  const [customerId, setCustomerId] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const navigate = useNavigate();
  const rideData = location.state as any;

  useEffect(() => {
    // Verifica o customer_id no cache
    const cachedCustomerId = localStorage.getItem("customer_id");
    if (cachedCustomerId) {
      setCustomerId(cachedCustomerId);
    } else if (rideData?.customerId) {
      setCustomerId(rideData.customerId);
    }

    if (rideData?.origin && rideData?.destination) {
      const origin = encodeURIComponent(rideData.origin);
      const destination = encodeURIComponent(rideData.destination);
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&path=enc:~encodedPolyline&markers=color:blue%7Clabel:A%7C${origin}&markers=color:red%7Clabel:B%7C${destination}&key=${apiKey}`;
      setMapUrl(url);
    }
  }, [rideData]);

  if (!rideData) {
    return <p>No momento não há motoristas disponíveis.</p>;
  }

  const handleConfirm = async (driver: any) => {
    const payload = {
      customer_id: customerId,
      origin: rideData.origin,
      destination: rideData.destination,
      distance: rideData.distance,
      duration: rideData.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };

    try {
      await confirmRide(payload);
      alert("Corrida confirmada com sucesso!");
      navigate("/ride-history");
    } catch (error: any) {
      alert(error.response?.data?.error_description || "An error occurred.");
    }
  };

  return (
    <div className="ride-options">
      <h1>Oções de corrida</h1>
      <p>
        Distância: {rideData.distance} km | Duração: {rideData.duration}
      </p>

      {mapUrl && (
        <div className="map-container">
          <img
            src={mapUrl}
            alt="Map showing the route from origin to destination"
            className="static-map"
          />
        </div>
      )}

      <div className="ride-card">
        {rideData.options.map((option: any) => (
          <div
            key={option.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h2>{option.name}</h2>
            <p>{option.description}</p>
            <p>Carro: {option.vehicle}</p>
            <p>Nota do motorista: {option.review.rating}/5</p>
            <p>Valor: ${option.value.toFixed(2)}</p>
            <button onClick={() => handleConfirm(option)}>Escolher</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideOptions;