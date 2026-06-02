# Vercel Environment Variables — Vigil Security

**Project:** vigil-s-projects1/security  
**Domain:** security.vigilservices.co.uk

---

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### 1. Calendly Integration
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/vigsecs/30min
```
**Environment:** Production, Preview, Development  
**Note:** This is read from env var, never hardcoded

### 2. Google Tag Manager
```
NEXT_PUBLIC_GTM_ID=GTM-N74LRNBJ
```
**Environment:** Production, Preview, Development  
**Note:** Security site's own GTM container

### 3. App URL
```
NEXT_PUBLIC_APP_URL=https://security.vigilservices.co.uk
```
**Environment:** Production  
**Preview/Dev:** Can be different URLs

### 4. Email Notifications (Gmail SMTP)
```
GMAIL_USER=vigsecs@gmail.com
```
**Environment:** Production, Preview, Development  
**Note:** Used by nodemailer in /api/qualify route

```
GMAIL_APP_PASSWORD=[owner to supply]
```
**Environment:** Production, Preview, Development  
**Note:** Gmail app password for vigsecs@gmail.com account  
**Get from:** Gmail → Security → 2-Step Verification → App passwords

### 5. Cloudinary
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=duhicmygg
```
**Environment:** Production, Preview, Development  
**Note:** Used for image optimization

### 6. Anthropic API (for future agents)
```
ANTHROPIC_API_KEY=[same key as cleaning site]
```
**Environment:** Production  
**Note:** Only needed if implementing autonomous agents

### 7. CRM Endpoint
```
CRM_ENDPOINT=https://app.vigilservices.co.uk/enquiry
```
**Environment:** Production, Preview, Development  
**Note:** Used by /api/qualify route for lead submission

---

## Summary Table

| Variable Name | Value | Production | Preview | Development |
|--------------|-------|------------|---------|-------------|
| NEXT_PUBLIC_CALENDLY_URL | https://calendly.com/vigsecs/30min | ✓ | ✓ | ✓ |
| NEXT_PUBLIC_GTM_ID | GTM-N74LRNBJ | ✓ | ✓ | ✓ |
| NEXT_PUBLIC_APP_URL | https://security.vigilservices.co.uk | ✓ | (use preview URL) | (use localhost) |
| GMAIL_USER | vigsecs@gmail.com | ✓ | ✓ | ✓ |
| GMAIL_APP_PASSWORD | [owner to supply] | ✓ | ✓ | ✓ |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | duhicmygg | ✓ | ✓ | ✓ |
| ANTHROPIC_API_KEY | [same as cleaning site] | ✓ | - | - |
| CRM_ENDPOINT | https://app.vigilservices.co.uk/enquiry | ✓ | ✓ | ✓ |

---

## Verification After Adding

### 1. Test Email Routing
- Submit qualification flow
- Check vigsecs@gmail.com receives email
- Subject should be: "New security enquiry — [premises] — [postcode]"

### 2. Test Calendly
- Visit result screen in qualification flow
- Calendly widget should render with:
  - Background: #0a1628 (navy)
  - Primary color: #4ecdc4 (teal)
  - Text: #ffffff (white)

### 3. Test GTM
- Open browser DevTools → Network
- Verify GTM-N74LRNBJ loads
- Check dataLayer pushes events

### 4. Test CRM Integration
- Submit qualification flow
- Check Laravel CRM at app.vigilservices.co.uk/admin/leads
- Lead should appear with service_type="Security"

### 5. Test Images
- Visit /manned-guarding-london/ and /mobile-patrols-london/
- Hero images should load via Cloudinary fetch from Unsplash
- Check Network tab: images served from res.cloudinary.com/duhicmygg

---

## Notes

- All `NEXT_PUBLIC_*` variables are exposed to the browser
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ANTHROPIC_API_KEY` are server-side only
- After adding variables, trigger a new deployment to apply them
- Preview and Development environments can use same values as Production for most variables
- NEVER commit actual API keys or passwords to git

---

**Added:** 2026-06-02  
**Last Updated:** 2026-06-02
