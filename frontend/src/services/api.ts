import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ?? (import.meta.env.DEV
      ? "http://localhost:8081"
      : "https://ordem-servico-system.onrender.com"),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");

      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
