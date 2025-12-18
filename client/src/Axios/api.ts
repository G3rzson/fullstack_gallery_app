import axios from "axios";

// main axios instance
export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// refresh token axios instance
export const refreshApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
