import axios from "axios";

const Base_URL = import.meta.env.VITE_COINGECKO_API_URL;
const apiClient = axios.create({
  baseURL: Base_URL,
  timeout: 10000,
  // Default headers - sent with every request
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor - runs BEFORE every request
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Making request to:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - runs AFTER every response
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response received from:', response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Error:', error.message)
    
    // Handle specific errors
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please wait a moment.'))
    }
    
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'))
    }
    
    return Promise.reject(error)
  }
)


export default apiClient;