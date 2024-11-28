import axios from "axios";

export const getDrivers = async () => {
  const response = await axios.get("http://localhost:8080/drivers");
  return response.data;
};
