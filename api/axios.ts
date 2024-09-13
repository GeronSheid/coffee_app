import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiClient;