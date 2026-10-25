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
npm run build    # tsc + production build into dist/ — verified passing 2026-10-25
```

## Submission package (done, 2026-10-25)

- Repo: https://github.com/KmSasikumar/ledgerly-invoice-viewer
- Live: https://kmsasikumar.github.io/ledgerly-invoice-viewer/ (GitHub Pages, `gh-pages` branch)
- Walkthrough: captioned screen capture, 80 seconds, no voice or face — https://github.com/KmSasikumar/ledgerly-invoice-viewer/blob/main/demo/ledgerly-walkthrough.mp4 — open list → filter to Overdue → open INV-2026-003 → show computed totals → search a line item → Print/PDF.
- Remaining: send repo + live link + walkthrough to Offset via the Wellfound thread (thread status being verified; the original ~72-hour window closed ~21 Oct 2026, so this sends late with a note if the thread is still open).
