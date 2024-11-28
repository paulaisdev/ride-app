import axios from "axios";

export const calculateRoute = async (origin: string, destination: string) => {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error("No routes found.");
    }

    const route = response.data.routes[0];
    const distance = route.legs[0].distance.value / 1000;
    const duration = route.legs[0].duration.text;

    return { distance, duration, routeResponse: response.data };
  } catch (error: any) {
    console.error("Error fetching route from Google Maps API:", error.message);
    throw new Error("Failed to calculate route using Google Maps API.");
  }
};
