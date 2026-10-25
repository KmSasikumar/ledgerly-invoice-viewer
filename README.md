# Ledgerly — Invoice / Document Viewer

Take-home for the **Offset — Frontend Developer Intern** application (Wellfound, confirmed 2026-10-18).
Brief: React + TypeScript invoice/document-viewer app, delivered with a GitHub repo, a live link, and a ≤2-minute Loom walkthrough, within ~72 hours of applying (~21 Oct 2026).

## What is built (rebuilt 2026-10-26 to the real task spec)

- **Review document (core tab)** — upload a PDF or image of an invoice/bill and display it, or use the built-in sample invoice document. A side panel shows the extracted fields from the provided mock JSON (invoice number INV-2041, date 2026-09-14, total amount 48,250.00), each with a bounding box in a 640×800 document coordinate space; the sample document renders those values at exactly those positions.
- **Click-to-highlight** — clicking a field draws a visible highlight box on the document at that field's box, positioned with percentages so it stays aligned at any display width.
- **Approve / edit + visible change log** — approve each value, or edit it; every edit appends to a visible change log showing the old value, the new value, and a timestamp. Added fields are logged the same way.
- **Draw-a-box bonus** — drag on the document to outline a new field, then name it and give it a value in a small inline form; it appears in the side panel and in the change log.
- **Honesty note** — the fields are the provided mock JSON, labelled as such in the UI. No OCR runs here; nothing is presented as a live extraction.
- **Invoice list (second tab)** — the original view is kept: search (number / client / line item), status filters (All / Paid / Pending / Overdue / Draft), outstanding-balance summary, and a print-faithful document viewer with a Print / save as PDF button.

## Run / build

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc + production build into dist/ — verified passing 2026-10-26
```

## Submission package (rebuilt 2026-10-26)

- Repo: https://github.com/KmSasikumar/ledgerly-invoice-viewer
- Live: https://kmsasikumar.github.io/ledgerly-invoice-viewer/ (GitHub Pages, `gh-pages` branch, rebuilt from the new `dist/`)
- Walkthrough: captioned screen capture, 106 seconds, no voice or face — https://github.com/KmSasikumar/ledgerly-invoice-viewer/blob/main/demo/ledgerly-walkthrough.mp4 — sample document + fields panel → click a field to highlight its box → edit a value to show the change log → draw a box to add a field → upload an image → code tour → one improvement (real OCR extraction instead of the mock JSON).
- Status: NOT SUBMITTED anywhere. This rebuild covers build + deploy + video only, per scope; nothing was sent to anyone. A signed-in Wellfound check on 2026-10-25 found the application still Pending but no message thread exists — no message box, no recruiter contact, no submission route on Wellfound — and the public listing is removed. Submission awaits the owner's decision.
