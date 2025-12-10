import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/ui/Modal'
import { Search, Plus, Edit, Eye, MoreVertical } from 'lucide-react'
import { demoOrganisations, type Organisation } from '../../data/demo.organisations'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/organisations')({
  component: OrganisationsPage,
})

function OrganisationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredOrgs = demoOrganisations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Organisation['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'trial':
        return 'warning'
      case 'suspended':
        return 'danger'
      default:
        return 'neutral'
    }
  }

  const getPlanColor = (plan: Organisation['plan']) => {
    switch (plan) {
      case 'enterprise':
        return 'purple'
      case 'premium':
        return 'default'
      case 'basic':
        return 'neutral'
      default:
        return 'neutral'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organisations</h1>
            <p className="mt-1 text-gray-600">
              Manage all tenant organisations (HOAs, Estates, Companies)
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Organisation
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search organisations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'trial', label: 'Trial' },
                  { value: 'suspended', label: 'Suspended' },
                ]}
                className="sm:w-48"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Total Organisations</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                {demoOrganisations.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Active</div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {demoOrganisations.filter((o) => o.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Trial</div>
              <div className="text-3xl font-bold text-amber-600 mt-2">
                {demoOrganisations.filter((o) => o.status === 'trial').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Monthly Revenue</div>
              <div className="text-3xl font-bold text-blue-600 mt-2">
                $
                {demoOrganisations
                  .reduce((sum, o) => sum + o.monthlyRevenue, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organisations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Organisations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-500">
                        Created {new Date(org.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{org.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPlanColor(org.plan)}>
                        {org.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(org.status)}>
                        {org.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{org.residents} Residents</div>
                        <div className="text-gray-500">
                          {org.guards} Guards, {org.admins} Admins
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ₦{org.monthlyRevenue}/mo
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(org.subscriptionExpiry).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedOrg(org)
                            setIsModalOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredOrgs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No organisations found matching your criteria
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedOrg(null)
        }}
        size="lg"
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          {selectedOrg ? 'Organisation Details' : 'Add New Organisation'}
        </ModalHeader>
        <ModalBody>
          {selectedOrg ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Name</div>
                  <div className="text-gray-900 font-semibold mt-1">
                    {selectedOrg.name}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Type</div>
                  <Badge variant="outline" className="mt-1">
                    {selectedOrg.type}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Plan</div>
                  <Badge variant={getPlanColor(selectedOrg.plan)} className="mt-1">
                    {selectedOrg.plan}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Status</div>
                  <Badge
                    variant={getStatusColor(selectedOrg.status)}
                    className="mt-1"
                  >
                    {selectedOrg.status}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Residents
                  </div>
                  <div className="text-gray-900 font-semibold mt-1">
                    {selectedOrg.residents}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Guards</div>
                  <div className="text-gray-900 font-semibold mt-1">
                    {selectedOrg.guards}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </div>
                  <div className="text-gray-900 font-semibold mt-1">
                    ₦{selectedOrg.monthlyRevenue}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Subscription Expiry
                  </div>
                  <div className="text-gray-900 font-semibold mt-1">
                    {new Date(selectedOrg.subscriptionExpiry).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Input label="Organisation Name" placeholder="Enter name" required />
              <Select
                label="Type"
                options={[
                  { value: 'HOA', label: 'HOA' },
                  { value: 'Estate', label: 'Estate' },
                  { value: 'Company', label: 'Company' },
                ]}
                required
              />
              <Select
                label="Plan"
                options={[
                  { value: 'basic', label: 'Basic' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'enterprise', label: 'Enterprise' },
                ]}
                required
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsModalOpen(false)
              setSelectedOrg(null)
            }}
          >
            {selectedOrg ? 'Close' : 'Cancel'}
          </Button>
          {!selectedOrg && <Button>Create Organisation</Button>}
          {selectedOrg && (
            <>
              <Button variant="warning">Upgrade Plan</Button>
              <Button variant="danger">Suspend</Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  )
}
