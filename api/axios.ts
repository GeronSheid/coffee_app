// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_UR || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

module.exports = apiClient;