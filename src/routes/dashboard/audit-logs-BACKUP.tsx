import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent } from '../../components/ui/Card'
import { FileText } from 'lucide-react'

export const Route = createFileRoute('/dashboard/audit-logs-BACKUP')({
  component: AuditLogsPage,
})

function AuditLogsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="mt-1 text-gray-600">
            Track all system actions and changes
          </p>
        </div>

        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Audit logs page coming soon</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
