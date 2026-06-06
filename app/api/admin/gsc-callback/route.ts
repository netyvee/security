import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_STORE } from '@/lib/gsc-token-store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json(
      { error: `OAuth error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code received' },
      { status: 400 }
    );
  }

  const clientId = process.env.GSC_CLIENT_ID;
  const clientSecret = process.env.GSC_CLIENT_SECRET;
  const redirectUri = process.env.GSC_REDIRECT_URI ||
    'https://security.vigilservices.co.uk/api/admin/gsc-callback';

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'OAuth credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const tokenRes = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      }
    );

    const tokens = await tokenRes.json();

    if (tokens.error) {
      return NextResponse.json(
        { error: tokens.error_description || tokens.error },
        { status: 400 }
      );
    }

    TOKEN_STORE.access_token = tokens.access_token;
    TOKEN_STORE.refresh_token = tokens.refresh_token;
    TOKEN_STORE.expires_at = Date.now() +
      (tokens.expires_in * 1000);

    console.log('GSC_REFRESH_TOKEN=' + tokens.refresh_token);

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>GSC Connected</title>
        <style>
          body {
            background: #0a1628;
            color: #fff;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            flex-direction: column;
            gap: 16px;
          }
          h1 { color: #4ecdc4; font-size: 24px; }
          p { color: rgba(255,255,255,0.6); font-size: 14px; }
          a {
            color: #4ecdc4;
            text-decoration: none;
            border: 1px solid #4ecdc4;
            padding: 8px 20px;
            border-radius: 8px;
            margin-top: 8px;
          }
        </style>
      </head>
      <body>
        <h1>✓ GSC Connected</h1>
        <p>Google Search Console access granted.</p>
        <div style="background:#0f1f3d;border:1px solid #4ecdc4;border-radius:8px;padding:16px;margin:16px 0;max-width:600px;word-break:break-all;text-align:left;">
          <p style="color:#4ecdc4;font-size:12px;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Refresh Token — Copy this to Vercel</p>
          <p style="color:#fff;font-size:12px;font-family:monospace;">${tokens.refresh_token}</p>
        </div>
        <p style="font-size:12px;color:rgba(255,255,255,0.4);">Add this as GSC_REFRESH_TOKEN in Vercel environment variables then redeploy.</p>
        <a href="/admin">Return to Command Centre</a>
      </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
