// Mock extracted fields, exactly as provided in the task brief.
// These are NOT a live extraction: no OCR runs here. The values and boxes
// below are the supplied mock JSON, rendered on the sample document so the
// boxes land on the matching text.
import type { CSSProperties } from 'react'

export const DOC_W = 640
export const DOC_H = 800

export type FieldSource = 'mock' | 'manual'

export interface ExtractedField {
  id: string
  label: string
  value: string
  /** [x1, y1, x2, y2] in the 640x800 document coordinate space. */
  bbox: [number, number, number, number]
  source: FieldSource
  approved: boolean
}

export const MOCK_FIELDS: ExtractedField[] = [
  {
    id: 'invoicenumber',
    label: 'Invoice number',
    value: 'INV-2041',
    bbox: [120, 80, 260, 100],
    source: 'mock',
    approved: false,
  },
  {
    id: 'date',
    label: 'Date',
    value: '2026-09-14',
    bbox: [400, 80, 520, 100],
    source: 'mock',
    approved: false,
  },
  {
    id: 'totalamount',
    label: 'Total amount',
    value: '48,250.00',
    bbox: [400, 620, 520, 645],
    source: 'mock',
    approved: false,
  },
]

export interface ChangeEntry {
  id: number
  text: string
  at: string
}

export function stamp(): string {
  return new Date().toLocaleString()
}

/** Convert a 640x800 box to CSS percentages so it stays aligned at any width. */
export function boxStyle(bbox: [number, number, number, number]): CSSProperties {
  const [x1, y1, x2, y2] = bbox
  return {
    left: `${(x1 / DOC_W) * 100}%`,
    top: `${(y1 / DOC_H) * 100}%`,
    width: `${((x2 - x1) / DOC_W) * 100}%`,
    height: `${((y2 - y1) / DOC_H) * 100}%`,
  }
}
