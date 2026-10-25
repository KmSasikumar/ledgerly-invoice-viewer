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
- Status 2026-10-25: NOT SUBMITTED. A signed-in Wellfound check found the application still Pending but no message thread exists — no message box, no recruiter contact, no submission route on Wellfound — and the public listing is removed. Nothing was sent through an invented channel.
- Spec gap, stated plainly: this app (invoice list + document viewer + computed totals) does NOT implement the full task as written in the posting — upload of a PDF/image invoice, an extracted-field side panel with click-to-highlight boxes on the document, approve/edit with a visible change log, the draw-a-box bonus, and a video walking through the code plus one improvement. Do not present this repo as the completed task unless it is rebuilt to that spec.
