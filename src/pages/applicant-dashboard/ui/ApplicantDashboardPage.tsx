import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { ApplicantInfo } from './ApplicantInfo'
import { ApplicantNetworking } from './ApplicantNetworking'
import { ApplicantPrivacy } from './ApplicantPrivacy'

export const ApplicantDashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/">
          <ArrowLeft />
        </Link>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <ApplicantInfo />
            <ApplicantPrivacy />
          </div>

          <div className="space-y-6 lg:col-span-8">
            <ApplicantNetworking />
          </div>
        </div>
      </div>
    </div>
  )
}
