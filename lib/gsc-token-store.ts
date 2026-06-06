export const TOKEN_STORE: {
  access_token: string | null;
  refresh_token: string | null;
  expires_at: number;
} = {
  access_token: null,
  refresh_token: process.env.GSC_REFRESH_TOKEN || null,
  expires_at: 0,
};
