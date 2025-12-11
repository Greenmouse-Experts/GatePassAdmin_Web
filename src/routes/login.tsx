import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Checkbox } from '../components/ui/Checkbox'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login - replace with actual API call
    setTimeout(() => {
      setIsLoading(false)
      navigate({ to: '/dashboard' })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#165757]/8 to-gray-50 relative overflow-hidden">
      {/* Animated Background Shapes - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,87,87,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(38,168,119,0.15)_0%,transparent_50%),radial-gradient(circle_at_40%_90%,rgba(26,143,95,0.12)_0%,transparent_50%)]"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#165757]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#26a877]/25 rounded-full blur-3xl translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#1a8f5f]/20 rounded-full blur-3xl translate-y-1/3"></div>
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-[#165757]/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#26a877]/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(22,87,87,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,87,87,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Navbar - Fixed */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-[#165757] rounded-lg">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EntXit</h1>
                <p className="text-xs text-gray-500">Super Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm text-gray-600 hover:text-[#165757] transition-colors">
                Home
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-[#165757] transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-[#165757] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Centered vertically */}
      <div className="flex items-center justify-center min-h-screen px-4 py-24 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo and title outside card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">EntXit</h1>
            <p className="text-sm text-[#165757] font-medium">Super Admin Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#165757]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-sm">
              Sign in to access your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@entxit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#165757] hover:text-[#134645] font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: admin@entxit.com</p>
            <p className="text-xs text-gray-600">Password: admin123</p>
          </div>
        </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              © 2025 EntXit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
