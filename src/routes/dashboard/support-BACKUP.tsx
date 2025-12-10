import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { HelpCircle } from 'lucide-react'

export const Route = createFileRoute('/dashboard/support-BACKUP')({
  component: SupportPage,
})

function SupportPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support & Helpdesk</h1>
          <p className="mt-1 text-gray-600">Get help and manage support tickets</p>
        </div>

        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Support page coming soon</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
