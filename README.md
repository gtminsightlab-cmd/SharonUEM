# Upper Echelon Management — Website Platform

Next.js 14 · Tailwind CSS · Vercel · GitHub

---

## Quick Start

```bash
git clone https://github.com/YOUR_ORG/uem-platform.git
cd uem-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    ← Homepage
│   ├── about/page.tsx              ← The UEM Edge
│   ├── services/page.tsx           ← Solutions (3 pillars)
│   ├── vault/
│   │   ├── page.tsx                ← Intelligence Vault index
│   │   └── [slug]/page.tsx         ← Individual paper page
│   ├── careers/page.tsx            ← Careers / Principal Track
│   ├── contact/page.tsx            ← Principal Dialogue form
│   ├── privacy/page.tsx            ← Privacy Policy
│   └── api/
│       ├── unlock-paper/route.ts   ← Validates lead, sets cookie
│       ├── download/[pdfKey]/route.ts  ← Serves PDF if cookie valid
│       └── contact/route.ts        ← Contact form handler
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── PaperDownloadGate.tsx   ← Gated download form
│   │   └── ContactForm.tsx
│   └── ui/
│       └── ScrollAnimator.tsx
└── content/
    └── papers.ts                   ← All 12 paper definitions (EDIT THIS)
```

---

## How to Add PDFs (The Gated Download System)

### Step 1 — Prepare your PDF

Name each PDF with an obfuscated filename that matches the `pdfKey` in `papers.ts`:

```
cardio_insight_2025_v1_xk9p.pdf
onco_insight_2025_v1_mp7r.pdf
cns_insight_2025_v1_tz4w.pdf
... etc
```

**Do NOT** name them `cardiology.pdf` — users could guess the URL.

### Step 2 — Place PDFs in the project

Put all PDF files in:

```
/public/downloads/cardio_insight_2025_v1_xk9p.pdf
/public/downloads/onco_insight_2025_v1_mp7r.pdf
```

### Step 3 — Mark paper as available

In `src/content/papers.ts`, set `available: true` for the paper:

```ts
{
  slug: 'cardiology-cardiovascular',
  available: true,           // ← change from false to true
  pdfKey: 'cardio_insight_2025_v1_xk9p.pdf',
  ...
}
```

### Step 4 — Deploy

```bash
git add .
git commit -m "Add cardiology deep insight PDF"
git push
```

Vercel auto-deploys. The gate goes live immediately.

---

## How the Gate Works (Flow)

```
User clicks "Unlock Report"
    ↓
PaperDownloadGate.tsx validates form
    ↓
POST /api/unlock-paper
    • Validates work email (rejects gmail/yahoo/hotmail)
    • Logs lead to CRM (Airtable) — configure env vars
    • Sends email notification to UEM team via Resend
    • Sets httpOnly cookie: uem-access-{slug}=granted (24hr)
    ↓
Client redirects to /api/download/{pdfKey}
    ↓
Route handler checks cookie
    • Valid: streams PDF, clears cookie (single-use)
    • Invalid: redirects back to paper page
```

---

## Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
# Email delivery (Resend — resend.com, free tier available)
RESEND_API_KEY=re_xxxxxxxxxxxx
LEAD_NOTIFICATION_EMAIL=principals@uem-partners.com
PRINCIPAL_EMAIL=principals@uem-partners.com

# Lead capture database (Airtable — optional but recommended)
AIRTABLE_API_KEY=patxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxx

# Site URL (for email links)
NEXT_PUBLIC_SITE_URL=https://uem-partners.com
```

To activate email + CRM: uncomment the relevant blocks in:
- `src/app/api/unlock-paper/route.ts`
- `src/app/api/contact/route.ts`

---

## Vercel Deployment

1. Push repo to GitHub (private repo recommended)
2. Go to [vercel.com](https://vercel.com) → Add New Project
3. Import the GitHub repo
4. Framework: **Next.js** (auto-detected)
5. Add Environment Variables
6. Deploy

Custom domain: Vercel Dashboard → Project → Domains → Add `uem-partners.com`
Update your domain's DNS nameservers to Vercel's edge network.

---

## Adding New Papers

1. Add the paper definition to `src/content/papers.ts`
2. Place PDF in `/public/downloads/` with the matching `pdfKey` filename
3. Set `available: true`
4. The vault page, filter, and individual paper page all auto-update

---

## Customization

### Colors
Edit `tailwind.config.js` → `theme.extend.colors.uem`

### Fonts
Edit `src/app/globals.css` → Google Fonts import

### Team Personas
Edit `src/app/about/page.tsx` → `PersonaCard` components

### Company Details
- Email addresses: search for `uem-partners.com` and replace
- Founded year: search for `2015`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Cormorant (display) + DM Sans (body) |
| Email | Resend |
| CRM/Leads | Airtable (optional) |
| PDF Storage | `/public/downloads/` (local) or Vercel Blob (scale) |
| Hosting | Vercel |
| Repo | GitHub |

---

## Scaling the PDF System (When You Need It)

For very high traffic, move PDFs from `/public/downloads/` to **Vercel Blob**:

```ts
// In /api/download/[pdfKey]/route.ts, replace readFile with:
import { head } from '@vercel/blob'
const blob = await head(`downloads/${pdfKey}`)
return NextResponse.redirect(blob.url)
```

Upload PDFs via Vercel Dashboard → Storage → Blob → Upload.

---

## License

Proprietary — Upper Echelon Management, LLC. All rights reserved.
