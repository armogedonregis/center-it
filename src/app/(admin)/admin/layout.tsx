'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import { ToastContainer } from 'react-toastify'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  )
} 