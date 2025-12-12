import { api, authUtils } from '../lib/api-client'

// Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

// Auth Service
export const authService = {
  // Login admin user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/v1/auth/login-admin', credentials)
    
    // Store token and user data
    if (response.token) {
      authUtils.setToken(response.token)
      authUtils.setUser(response.user)
    }
    
    return response
  },

  // Logout
  logout: () => {
    authUtils.logout()
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return authUtils.getUser<User>()
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return authUtils.isAuthenticated()
  },

  // Register (if needed)
  register: async (data: any): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/api/v1/auth/register', data)
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/api/v1/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/api/v1/auth/reset-password', { token, password })
  },

  // Verify email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    return api.post<{ message: string }>('/api/v1/auth/verify-email', { token })
  },

  // Refresh token (if needed)
  refreshToken: async (): Promise<{ token: string }> => {
    return api.post<{ token: string }>('/api/v1/auth/refresh-token')
  },
}
