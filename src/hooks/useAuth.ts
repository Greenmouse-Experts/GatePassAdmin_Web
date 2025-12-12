import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authService, type LoginCredentials, type LoginResponse } from '../services/auth.service'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data: LoginResponse) => {
      // Show success toast
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      })
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] })
      
      // Redirect to dashboard
      navigate({ to: '/dashboard' })
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      
      // Show error toast
      const message = error?.response?.data?.message || error?.message || 'Login failed. Please try again.'
      toast.error('Login Failed', {
        description: message,
      })
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      authService.logout()
      return Promise.resolve()
    },
    onSuccess: () => {
      // Show success toast
      toast.success('Logged out successfully', {
        description: 'See you next time!',
      })
      
      // Clear all queries
      queryClient.clear()
      
      // Redirect to login
      navigate({ to: '/login' })
    },
  })

  // Get current user query
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    // Mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    
    // States
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    
    // User data
    user: userQuery.data,
    isAuthenticated: authService.isAuthenticated(),
    
    // Reset error
    resetLoginError: loginMutation.reset,
  }
}
