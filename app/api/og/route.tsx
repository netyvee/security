import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'SIA-Licensed Security London'
  const sub = searchParams.get('sub') ?? 'Directly employed officers · All Greater London boroughs'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a1628',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '36px', height: '3px', background: '#4ecdc4' }} />
          <span style={{ fontSize: '14px', color: '#4ecdc4', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
            Vigil Security Services
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: title.length > 50 ? '48px' : '58px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
            {sub}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {['SIA licensed', 'DBS checked', '£10M insured'].map((badge) => (
              <div
                key={badge}
                style={{
                  background: 'rgba(78,205,196,0.10)',
                  border: '1px solid rgba(78,205,196,0.25)',
                  borderRadius: '24px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  color: '#4ecdc4',
                  fontWeight: 500,
                }}
              >
                {badge}
              </div>
            ))}
          </div>
          {/* Logo mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '32px', background: '#4ecdc4', borderRadius: '2px' }} />
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.1em' }}>VIGIL</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
