import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import {
  demoRevenueData,
  demoUserGrowthData,
  demoDashboardStats,
} from '../../data/demo.dashboard'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/reports-BACKUP')({
  component: ReportsPage,
})

function ReportsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="mt-1 text-gray-600">
              Usage metrics, revenue analytics, and performance insights
            </p>
          </div>
          <div className="flex gap-3">
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              options={[
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: '1y', label: 'Last year' },
              ]}
            />
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Users</div>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    {(
                      demoDashboardStats.totalResidents +
                      demoDashboardStats.totalGuards +
                      demoDashboardStats.totalSubAdmins
                    ).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{demoDashboardStats.userGrowth}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#165757]/10 rounded-lg">
                  <Users className="w-8 h-8 text-[#165757]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">MRR</div>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    ${demoDashboardStats.monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{demoDashboardStats.revenueGrowth}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#1a8f5f]/10 rounded-lg">
                  <DollarSign className="w-8 h-8 text-[#1a8f5f]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Active Orgs</div>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    {demoDashboardStats.activeSubscriptions}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    of {demoDashboardStats.totalOrganisations} total
                  </div>
                </div>
                <div className="p-3 bg-[#26a877]/10 rounded-lg">
                  <Activity className="w-8 h-8 text-[#26a877]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Avg Check-ins</div>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    {demoDashboardStats.newVisitorsToday}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">per day</div>
                </div>
                <div className="p-3 bg-[#165757]/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#165757]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex items-end h-full gap-2">
                  {demoRevenueData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full flex flex-col items-center">
                        <div className="relative w-full">
                          <div
                            className="w-full bg-gradient-to-t from-[#165757] to-[#1a8f5f] rounded-t hover:from-[#134645] hover:to-[#157a4f] transition-colors cursor-pointer"
                            style={{
                              height: `${(data.revenue / 6000) * 250}px`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {data.month}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${(data.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-600">
                  Total: $
                  {demoRevenueData
                    .reduce((sum, d) => sum + d.revenue, 0)
                    .toLocaleString()}
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex items-end h-full gap-2">
                  {demoUserGrowthData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full flex flex-col items-center gap-0.5">
                        <div
                          className="w-full bg-[#165757] hover:bg-[#134645] transition-colors cursor-pointer"
                          style={{
                            height: `${(data.residents / 1500) * 150}px`,
                          }}
                          title={`Residents: ${data.residents}`}
                        />
                        <div
                          className="w-full bg-[#1a8f5f] hover:bg-[#157a4f] transition-colors cursor-pointer"
                          style={{
                            height: `${(data.guards / 70) * 60}px`,
                          }}
                          title={`Guards: ${data.guards}`}
                        />
                        <div
                          className="w-full bg-[#26a877] hover:bg-[#1f8f64] transition-colors cursor-pointer"
                          style={{
                            height: `${(data.subAdmins / 15) * 40}px`,
                          }}
                          title={`Sub-admins: ${data.subAdmins}`}
                        />
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {data.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#165757] rounded" />
                  <span className="text-sm text-gray-600">Residents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1a8f5f] rounded" />
                  <span className="text-sm text-gray-600">Guards</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#26a877] rounded" />
                  <span className="text-sm text-gray-600">Sub-admins</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Daily Active Users</span>
                  <span className="text-lg font-bold text-gray-900">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Weekly Active Users</span>
                  <span className="text-lg font-bold text-gray-900">1,203</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Active Users</span>
                  <span className="text-lg font-bold text-gray-900">1,494</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check-in Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Check-ins</span>
                  <span className="text-lg font-bold text-gray-900">3,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Duration</span>
                  <span className="text-lg font-bold text-gray-900">2.3h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Peak Hours</span>
                  <span className="text-lg font-bold text-gray-900">2-5 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ARPU</span>
                  <span className="text-lg font-bold text-gray-900">₦1,039</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Churn Rate</span>
                  <span className="text-lg font-bold text-gray-900">2.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">LTV</span>
                  <span className="text-lg font-bold text-gray-900">₦18,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
