import { NextResponse } from 'next/server';
import { TOKEN_STORE } from '@/lib/gsc-token-store';

export async function GET() {
  const clientId = process.env.GSC_CLIENT_ID;
  const clientSecret = process.env.GSC_CLIENT_SECRET;

  if (!TOKEN_STORE.refresh_token) {
    return NextResponse.json({
      connected: false,
      message: 'Not authorised — visit /api/admin/gsc-auth to connect',
    });
  }

  if (Date.now() > TOKEN_STORE.expires_at - 60000) {
    try {
      const refreshRes = await fetch(
        'https://oauth2.googleapis.com/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId || '',
            client_secret: clientSecret || '',
            refresh_token: TOKEN_STORE.refresh_token,
            grant_type: 'refresh_token',
          }),
        }
      );
      const refreshed = await refreshRes.json();
      if (refreshed.access_token) {
        TOKEN_STORE.access_token = refreshed.access_token;
        TOKEN_STORE.expires_at = Date.now() +
          (refreshed.expires_in * 1000);
      }
    } catch {
      return NextResponse.json({
        connected: false,
        message: 'Token refresh failed — re-authorise at /api/admin/gsc-auth',
      });
    }
  }

  return NextResponse.json({
    connected: true,
    access_token: TOKEN_STORE.access_token,
    expires_at: new Date(TOKEN_STORE.expires_at).toISOString(),
  });
}
