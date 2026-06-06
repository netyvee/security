import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GSC_CLIENT_ID;
  const redirectUri = process.env.GSC_REDIRECT_URI ||
    'https://security.vigilservices.co.uk/api/admin/gsc-callback';

  if (!clientId) {
    return NextResponse.json(
      { error: 'GSC_CLIENT_ID not configured' },
      { status: 500 }
    );
  }

  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters',
  ].join(' ');

  const authUrl = new URL(
    'https://accounts.google.com/o/oauth2/v2/auth'
  );
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  return NextResponse.redirect(authUrl.toString());
}
