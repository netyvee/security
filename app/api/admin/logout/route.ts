import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('vigil_admin_session')

    console.log(`[AUTH] ${new Date().toISOString()} | User logged out`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[AUTH] Logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}
