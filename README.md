# /public/downloads/

This directory holds the gated PDF reports.

## Naming Convention

Each PDF filename must exactly match the `pdfKey` field in `src/content/papers.ts`.

## Current Papers

| Paper | pdfKey | Status |
|-------|--------|--------|
| Cardiology & Cardiovascular | `cardio_insight_2025_v1_xk9p.pdf` | Add PDF here |
| Oncology & Hematology | `onco_insight_2025_v1_mp7r.pdf` | Add PDF here |
| CNS & Neurology | `cns_insight_2025_v1_tz4w.pdf` | Add PDF here |
| Rare & Orphan Disease | `rare_insight_2025_v1_nf2q.pdf` | Add PDF here |
| Immunology & Inflammation | `immuno_insight_2025_v1_ry8s.pdf` | Add PDF here |
| Endocrinology & Metabolic | `metabolic_insight_2025_v1_bk3j.pdf` | Add PDF here |
| Infectious Diseases | `infect_insight_2025_v1_gh6v.pdf` | Add PDF here |
| Gastroenterology | `gastro_insight_2025_v1_cl5u.pdf` | Add PDF here |
| Respiratory | `resp_insight_2025_v1_wn1e.pdf` | Add PDF here |
| Dermatology | `derm_insight_2025_v1_aq8m.pdf` | Add PDF here |
| Ophthalmology | `ophthal_insight_2025_v1_ds3r.pdf` | Add PDF here |
| Nephrology & Urology | `nephro_insight_2025_v1_jt7b.pdf` | Add PDF here |

## Steps to Activate a Paper

1. Drop the PDF into this directory with the correct filename
2. Open `src/content/papers.ts`
3. Find the paper and set `available: true`
4. Commit and push — Vercel auto-deploys in ~30 seconds

## Security Note

These files are served only through the `/api/download/[pdfKey]` route handler,
which requires a valid httpOnly cookie set after form submission.
Direct URL access is blocked and redirects to the paper's gate page.
