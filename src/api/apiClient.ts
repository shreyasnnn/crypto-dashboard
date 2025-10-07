// src/api/apiClient.ts
import axios from 'axios'

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (API_KEY) {
      config.headers['x-cg-demo-api-key'] = API_KEY
    }
    
    console.log('📤 Making request to:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response received from:', response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Error:', error.message)
    
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Rate limit exceeded. Please wait a moment.'))
    }
    
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'))
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
