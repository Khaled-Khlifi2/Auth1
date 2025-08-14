// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // Your backend URL

export const registerUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/register`, { email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const getProtectedData = async (token) => {
  const res = await axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
