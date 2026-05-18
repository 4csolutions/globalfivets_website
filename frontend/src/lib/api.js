import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gf_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Avoid wiping during the initial /auth/me check before login
      const url = err?.config?.url || "";
      if (!url.includes("/auth/me")) {
        localStorage.removeItem("gf_token");
      }
    }
    return Promise.reject(err);
  }
);

// Resolve a backend URL (handles relative /api/uploads/... and absolute URLs)
export const resolveImage = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/api/")) return `${BACKEND_URL}${url}`;
  return url;
};

export default api;
