import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { Settings as SettingsIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/settings-BACKUP')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">Manage system configurations</p>
        </div>

        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            <SettingsIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Settings page coming soon</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
