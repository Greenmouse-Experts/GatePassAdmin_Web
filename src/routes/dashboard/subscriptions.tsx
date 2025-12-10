import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table'
import { Check, FileText, Plus, Tag } from 'lucide-react'
import {
  demoPlans,
  demoSubscriptions,
  demoInvoices,
} from '../../data/demo.subscriptions'

export const Route = createFileRoute('/dashboard/subscriptions')({
  component: SubscriptionsPage,
})

function SubscriptionsPage() {
  const getInvoiceStatusColor = (
    status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  ) => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      case 'overdue':
        return 'danger'
      case 'cancelled':
        return 'neutral'
    }
  }

  const totalRevenue = demoInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const pendingRevenue = demoInvoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Subscription & Billing
            </h1>
            <p className="mt-1 text-gray-600">
              Manage plans, subscriptions, invoices, and promo codes
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Tag className="w-4 h-4" />
              Promo Codes
            </Button>
            <Button>
              <Plus className="w-4 h-4" />
              Create Plan
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Pending Payments</div>
              <div className="text-3xl font-bold text-amber-600 mt-2">
                ${pendingRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {demoInvoices.filter((i) => i.status === 'pending').length}{' '}
                invoices
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">Active Subscriptions</div>
              <div className="text-3xl font-bold text-[#165757] mt-2">
                {demoSubscriptions.filter((s) => s.status === 'active').length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {demoSubscriptions.length} total
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600">MRR</div>
              <div className="text-3xl font-bold text-[#1a8f5f] mt-2">
                $
                {demoSubscriptions
                  .filter((s) => s.status === 'active')
                  .reduce((sum, s) => sum + s.amount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Monthly recurring revenue
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoPlans.map((plan) => (
                <Card key={plan.id} className="relative">
                  {plan.name === 'enterprise' && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="purple">Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl capitalize">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full mt-6"
                      variant={plan.name === 'enterprise' ? 'primary' : 'outline'}
                    >
                      Edit Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Billing Cycle</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoSubscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="font-medium text-gray-900">
                            {sub.organisationName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.plan === 'enterprise'
                                ? 'purple'
                                : sub.plan === 'premium'
                                  ? 'default'
                                  : 'neutral'
                            }
                            className="capitalize"
                          >
                            {sub.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              sub.status === 'active'
                                ? 'success'
                                : sub.status === 'trial'
                                  ? 'warning'
                                  : 'neutral'
                            }
                            className="capitalize"
                          >
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            ${sub.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="capitalize">{sub.billingCycle}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(sub.nextBillingDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Upgrade
                            </Button>
                            <Button size="sm" variant="ghost">
                              •••
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Invoices</CardTitle>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="font-medium text-gray-900">
                            {invoice.invoiceNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {invoice.organisationName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            ${invoice.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getInvoiceStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {invoice.paidDate
                              ? new Date(invoice.paidDate).toLocaleDateString()
                              : '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {invoice.status === 'pending' && (
                              <Button size="sm">Send Reminder</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
