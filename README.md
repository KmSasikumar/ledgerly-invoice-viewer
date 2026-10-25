# Ledgerly — Invoice / Document Viewer

Take-home for the **Offset — Frontend Developer Intern** application (Wellfound, confirmed 2026-10-18).
Brief: React + TypeScript invoice/document-viewer app, delivered with a GitHub repo, a live link, and a ≤2-minute Loom walkthrough, within ~72 hours of applying (~21 Oct 2026).

## What is built

- **Invoice list panel** — search (number / client / line item), status filters (All / Paid / Pending / Overdue / Draft), outstanding-balance summary.
- **Document viewer** — a print-faithful invoice document: seller/buyer blocks, issue & due dates, itemised table, subtotal, tax, and total computed from the line items (no hard-coded totals).
- **Print / save as PDF** button with a print stylesheet that isolates the document.
- Six realistic mock invoices (INR + one USD export invoice at 0% tax) in `src/data/invoices.ts`; all money/date formatting via `Intl`.

## Run / build

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc + production build into dist/ — verified passing 2026-10-19
```

## Submission checklist (remaining)

1. Push this folder to a new GitHub repo under the user's account (KmSasikumar).
2. Deploy `dist/` (Vercel/Netlify/Antideploy) and note the live URL.
3. Record a ≤2-minute Loom: open list → filter to Overdue → open INV-2026-003 → show computed totals → search a line item → Print/PDF.
4. Send repo + live link + Loom to Offset via the Wellfound thread before the ~72-hour window closes (~21 Oct 2026).
