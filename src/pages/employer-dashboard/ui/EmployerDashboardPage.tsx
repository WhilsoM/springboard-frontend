import { Button, Input } from '@/shared'
import { Badge, Bell, Briefcase, Edit, Plus, Upload, XCircle } from 'lucide-react'

const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Junior Java Developer',
    status: 'Active',
    applications: 12,
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Frontend Internship',
    status: 'Active',
    applications: 45,
    posted: '1 week ago',
  },
  {
    id: 3,
    title: 'Data Analyst',
    status: 'Closed',
    applications: 89,
    posted: '1 month ago',
  },
]

export const EmployerDashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2>Employer Workspace</h2>
            <p className="mt-1 text-sm text-slate-600">
              Manage your company profile and opportunities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              <Badge className="ml-1 px-1.5">3</Badge>
            </Button>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Create New Opportunity
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Verification & Profile */}
          <div className="space-y-6 lg:col-span-1">
            {/* Verification Section */}
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Company Verification</h3>
                <Badge>Pending Verification</Badge>
              </div>
              <p className="mb-4 text-sm text-slate-600">
                Please submit your tax details to unlock hiring features and receive verified
                status.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    INN (Tax ID)
                  </label>
                  <Input placeholder="Enter 10 or 12 digit INN" />
                </div>

                <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <Upload className="mx-auto mb-2 h-6 w-6 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">
                    Upload Registration Documents
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PDF or images up to 5MB</p>
                </div>

                <Button className="w-full">Submit for Review</Button>
              </div>
            </div>

            {/* Profile Editor */}
            <div className="p-6">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">Company Profile Editor</h3>

              <div className="mb-6 flex flex-col items-center gap-4">
                <img alt="TechCorp" className="h-24 w-24 border-4 border-white shadow-md" />
                <Button variant="outline" size="sm" className="w-full max-w-[200px] gap-2">
                  <Upload className="h-4 w-4" /> Upload Logo
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Company Name
                  </label>
                  <Input defaultValue="TechCorp Russia" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    defaultValue="Leading technology company focused on building innovative SaaS solutions for the enterprise market."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Website URL
                  </label>
                  <Input defaultValue="https://techcorp.ru" />
                </div>

                <div className="pt-2">
                  <Button variant="secondary" className="w-full">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Manage Opportunities */}
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden">
              <div className="border-b border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Manage Opportunities</h3>
                <p className="text-sm text-slate-500 mt-1">Active and closed job postings</p>
              </div>

              <div className="divide-y divide-slate-100">
                {MOCK_OPPORTUNITIES.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col gap-4 bg-white p-6 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{job.title}</h4>
                        <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Badge className="px-2">{job.status}</Badge>
                          </span>
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4 sm:border-0 sm:pt-0">
                      <div className="flex flex-col items-center sm:items-end">
                        <span className="text-2xl font-bold text-slate-900 leading-none">
                          {job.applications}
                        </span>
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mt-1">
                          New Apps
                        </span>
                      </div>

                      <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="px-3" title="Edit">
                          <Edit className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 hover:text-rose-600 hover:border-rose-200"
                          title="Close Opportunity"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                <Button variant="ghost" className="text-blue-600 w-full sm:w-auto">
                  View All History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
