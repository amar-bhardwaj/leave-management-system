import axios from "axios";

/*
BASE API URL
Use environment variable if available
Fallback to production server
*/
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://leave-management-system-gfzm.onrender.com/api";

/*
CREATE AXIOS INSTANCE
*/
const API = axios.create({
  baseURL: BASE_URL
});

/*
REQUEST INTERCEPTOR
Attach JWT token automatically
*/
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

/*
RESPONSE INTERCEPTOR
Handle expired tokens automatically
*/
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;