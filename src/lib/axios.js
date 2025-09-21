import axios from "axios";

const baseURL = import.meta.env.VITE_BE_TICKITZ_API;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

export const uploadInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "multipart/form-data" },
});

const attachToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);
uploadInstance.interceptors.request.use(attachToken, (error) =>
  Promise.reject(error)
);
