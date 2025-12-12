import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios'

// Base URL from environment variable or default
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden')
    }

    // Handle 500 - Server Error
    if (error.response?.status === 500) {
      console.error('Server error')
    }

    return Promise.reject(error)
  }
)

// Generic API methods
export const api = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(url, config)
    return response.data
  },

  // POST request
  post: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config)
    return response.data
  },

  // PUT request
  put: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config)
    return response.data
  },

  // PATCH request
  patch: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config)
    return response.data
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<T>(url, config)
    return response.data
  },
}

// Auth utilities
export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token)
  },

  getToken: (): string | null => {
    return localStorage.getItem('auth_token')
  },

  removeToken: () => {
    localStorage.removeItem('auth_token')
  },

  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getUser: <T = any>(): T | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  removeUser: () => {
    localStorage.removeItem('user')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token')
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },
}

export default apiClient
