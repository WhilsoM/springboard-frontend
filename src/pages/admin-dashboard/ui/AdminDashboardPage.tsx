import { useState } from 'react'
import type { TTab } from '../model'
import { AdminSidebar } from './AdminSidebar'
import { AdminTab, ModerationTab, TagsTab, UsersTab, VerificationTab } from './tabs'

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TTab>('verifications')

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-500">
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>

          {activeTab === 'verifications' && <VerificationTab />}

          {activeTab === 'moderation' && <ModerationTab />}

          {activeTab === 'tags' && <TagsTab />}

          {activeTab === 'admins' && <AdminTab />}

          {activeTab === 'users' && <UsersTab />}
        </div>
      </main>
    </div>
  )
}
