import { Metadata } from 'next'
import CommandCentre from '@/components/admin/CommandCentre'

export const metadata: Metadata = {
  title: 'Command Centre | Vigil Security Admin',
  description: 'Admin dashboard for Vigil Security Services',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return <CommandCentre />
}
