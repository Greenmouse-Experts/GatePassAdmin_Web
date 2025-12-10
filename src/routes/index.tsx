import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/Button'
import { ArrowRight, Shield, Users, BarChart3, Bell } from 'lucide-react'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#165757]/5 via-white to-[#1a8f5f]/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#165757] rounded-2xl mb-8">
            <span className="text-4xl font-bold text-white">E</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to EntXit
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Professional Gate Pass Management System for HOAs, Estates, and
            Companies. Streamline visitor management, enhance security, and
            improve resident experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-[#165757]" />}
            title="Security Management"
            description="Real-time security alerts and incident tracking with panic button integration"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-[#1a8f5f]" />}
            title="User Management"
            description="Manage residents, guards, and admins with role-based permissions"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-[#165757]" />}
            title="Analytics & Reports"
            description="Comprehensive insights on usage, revenue, and user growth metrics"
          />
          <FeatureCard
            icon={<Bell className="w-8 h-8 text-[#1a8f5f]" />}
            title="Announcements"
            description="System-wide broadcasts with scheduled delivery and priority levels"
          />
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
