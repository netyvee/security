'use client';

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: '#0a1628',
        borderTop: '1px solid rgba(78,205,196,0.15)',
        padding: '40px 32px 32px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}
      >
        {/* Brand column */}
        <div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.05em',
              marginBottom: 8,
            }}
          >
            VIGIL SECURITY SERVICES
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            Professional security services<br />
            across all 32 London boroughs.<br />
            SIA licensed officers.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            020 3973 8892
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            security@vigilservices.co.uk
          </p>
        </div>

        {/* Services column */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#4ecdc4',
              marginBottom: 16,
            }}
          >
            Our Services
          </p>
          <nav aria-label="Security services">
            {[
              { href: '/manned-guarding-london', label: 'Manned Guarding London' },
              { href: '/mobile-patrols-london', label: 'Mobile Patrols London' },
              { href: '/construction-site-security-london', label: 'Construction Site Security' },
              { href: '/event-security-london', label: 'Event Security London' },
              { href: '/key-holding-london', label: 'Key Holding London' },
              { href: '/concierge-security-london', label: 'Concierge Security London' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  marginBottom: 8,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLAnchorElement).style.color = '#4ecdc4';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Locations column */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#4ecdc4',
              marginBottom: 16,
            }}
          >
            Areas We Cover
          </p>
          <nav aria-label="Areas covered">
            {[
              { href: '/security-services-city-of-london', label: 'City of London' },
              { href: '/security-services-canary-wharf', label: 'Canary Wharf' },
              { href: '/security-services-westminster', label: 'Westminster' },
              { href: '/security-services-camden', label: 'Camden' },
              { href: '/security-services-islington', label: 'Islington' },
              { href: '/security-services-greater-london', label: 'Greater London' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  marginBottom: 8,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLAnchorElement).style.color = '#4ecdc4';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Legal column */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#4ecdc4',
              marginBottom: 16,
            }}
          >
            Company
          </p>
          <nav aria-label="Company links">
            {[
              { href: '/about-vigil-security-services', label: 'About Us' },
              { href: '/security-jobs-london', label: 'Careers' },
              { href: '/faq', label: 'FAQ' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/cookie-policy', label: 'Cookie Policy' },
              { href: '/accessibility-statement', label: 'Accessibility' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  marginBottom: 8,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLAnchorElement).style.color = '#4ecdc4';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: '32px auto 0',
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Vigil Services Ltd · Company No. 11756806 ·
          Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          Registered in England & Wales
        </p>
      </div>
    </footer>
  );
}
