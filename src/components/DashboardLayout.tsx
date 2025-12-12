import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Bell,
  AlertTriangle,
  BarChart3,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { useAuth } from '../hooks/useAuth'

interface DashboardLayoutProps {
  children: ReactNode
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Building2, label: 'Organisations', href: '/dashboard/organisations' },
  { icon: Users, label: 'EntXit Logs', href: '/dashboard/users' },
  {
    icon: CreditCard,
    label: 'Subscription & Billing',
    href: '/dashboard/subscriptions',
  },
  { icon: Bell, label: 'Announcements', href: '/dashboard/announcements' },
  {
    icon: AlertTriangle,
    label: 'Security Alerts',
    href: '/dashboard/alerts',
  },
  {
    icon: BarChart3,
    label: 'Reports & Analytics',
    href: '/dashboard/reports',
  },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: FileText, label: 'Audit Logs', href: '/dashboard/audit-logs' },
  { icon: HelpCircle, label: 'Support', href: '/dashboard/support' },
]

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { logout, isLoggingOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-[#165757] rounded-lg">
                  <span className="text-xl font-bold text-white">E</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EntXit</h1>
                  <p className="text-xs text-gray-500">Super Admin Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-[#165757] rounded-full flex items-center justify-center text-white font-semibold">
                  AU
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-1 font-medium">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors cursor-pointer"
                  activeProps={{
                    className:
                      'bg-[#165757]/10 text-[#165757] hover:bg-[#165757]/15 font-semibold',
                  }}
                  activeOptions={{
                    exact: item.href === '/dashboard',
                  }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button 
              onClick={() => logout()} 
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={cn(
          'pt-20 transition-all',
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
