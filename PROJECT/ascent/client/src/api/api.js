import axios from "axios";

// Vite injects import.meta.env variables at build time. 
// If VITE_API_URL exists (in Vercel), it uses that. Otherwise, it defaults to localhost.
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;