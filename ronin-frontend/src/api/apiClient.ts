import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://envwrong:8080/api/products";
console.log("API URL:", import.meta.env.VITE_API_URL);

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});