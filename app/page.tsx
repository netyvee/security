import type { Metadata } from 'next'
import SecurityQualificationFlow from '@/components/SecurityQualificationFlow'
import HomeLayout from '@/components/HomeLayout'

export const metadata: Metadata = {
  title: 'SIA Licensed Security Services London | Vigil Security',
  description:
    'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, key holding, event security.',
}

export default function HomePage() {
  return (
    <HomeLayout>
      <SecurityQualificationFlow />
    </HomeLayout>
  )
}
