import api from "./api";

interface EstimateRideRequest {
  customer_id: string;
  origin: string;
  destination: string;
}

interface EstimateRideResponse {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: { rating: number; comment: string };
    value: number;
  }[];
}

export const estimateRide = async (data: EstimateRideRequest): Promise<EstimateRideResponse> => {
  const response = await api.post("/ride/estimate", data);
  return response.data;
};

export const confirmRide = async (data: any): Promise<void> => {
  await api.patch("/ride/confirm", data);
};

export const getRideHistory = async (customerId: string, driverId?: string): Promise<any> => {
  const response = await api.get(`/ride/${customerId}`, {
    params: driverId ? { driver_id: driverId } : undefined,
  });
  return response.data;
};