import axios from "axios";

export const URL = axios.create({
  // http://ipAddress:port
  baseURL: "http://localhost:5550",
});
