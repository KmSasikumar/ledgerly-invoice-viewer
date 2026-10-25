export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft'

export interface LineItem {
  description: string
  quantity: number
  unitPrice: number
}

export interface Invoice {
  id: string
  number: string
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  currency: string
  seller: { name: string; address: string; email: string; taxId: string }
  buyer: { name: string; address: string; email: string }
  items: LineItem[]
  taxRate: number // e.g. 0.18 for 18%
  notes: string
}

export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    number: 'INV-2026-001',
    status: 'paid',
    issueDate: '2026-09-02',
    dueDate: '2026-09-16',
    currency: 'INR',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Acme Retail Pvt Ltd', address: '88 Residency Road, Bengaluru, KA 560025', email: 'ap@acme.example' },
    items: [
      { description: 'Brand identity design — logo suite', quantity: 1, unitPrice: 45000 },
      { description: 'Landing page design (desktop + mobile)', quantity: 2, unitPrice: 18000 },
      { description: 'Design system documentation', quantity: 1, unitPrice: 12000 },
    ],
    taxRate: 0.18,
    notes: 'Payment received via bank transfer. Thank you for your business.',
  },
  {
    id: 'inv-002',
    number: 'INV-2026-002',
    status: 'pending',
    issueDate: '2026-10-01',
    dueDate: '2026-10-21',
    currency: 'INR',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Helios Tech Labs', address: 'Sector 62, Noida, UP 201309', email: 'finance@helios.example' },
    items: [
      { description: 'React dashboard development — sprint 1', quantity: 40, unitPrice: 1500 },
      { description: 'API integration (payments + auth)', quantity: 16, unitPrice: 1750 },
    ],
    taxRate: 0.18,
    notes: 'Net 20 terms. Please quote the invoice number on your payment.',
  },
  {
    id: 'inv-003',
    number: 'INV-2026-003',
    status: 'overdue',
    issueDate: '2026-08-14',
    dueDate: '2026-08-28',
    currency: 'INR',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Bluepeak Logistics', address: 'Plot 9, MIDC, Pune, MH 411019', email: 'accounts@bluepeak.example' },
    items: [
      { description: 'Warehouse inventory app — MVP', quantity: 1, unitPrice: 95000 },
      { description: 'Barcode scanning module', quantity: 1, unitPrice: 22000 },
      { description: 'Staff training session (half day)', quantity: 2, unitPrice: 6000 },
    ],
    taxRate: 0.18,
    notes: 'This invoice is now overdue. A 1.5% monthly late fee applies per our agreement.',
  },
  {
    id: 'inv-004',
    number: 'INV-2026-004',
    status: 'draft',
    issueDate: '2026-10-15',
    dueDate: '2026-10-29',
    currency: 'INR',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Fern & Co. Interiors', address: '21 Park Street, Kolkata, WB 700016', email: 'hello@fernandco.example' },
    items: [
      { description: 'E-commerce site — product catalogue setup', quantity: 120, unitPrice: 250 },
      { description: 'Checkout flow customisation', quantity: 1, unitPrice: 15000 },
    ],
    taxRate: 0.18,
    notes: 'Draft — awaiting final scope confirmation before issuing.',
  },
  {
    id: 'inv-005',
    number: 'INV-2026-005',
    status: 'paid',
    issueDate: '2026-09-20',
    dueDate: '2026-10-04',
    currency: 'USD',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Offset Ventures LLC', address: '400 Market St, San Francisco, CA 94105', email: 'ap@offsetventures.example' },
    items: [
      { description: 'Invoice viewer prototype — design + build', quantity: 1, unitPrice: 2400 },
      { description: 'Accessibility pass (WCAG 2.1 AA)', quantity: 1, unitPrice: 600 },
    ],
    taxRate: 0,
    notes: 'Export of services — no GST charged. Paid via wire transfer.',
  },
  {
    id: 'inv-006',
    number: 'INV-2026-006',
    status: 'pending',
    issueDate: '2026-10-10',
    dueDate: '2026-10-24',
    currency: 'INR',
    seller: { name: 'Northwind Studio', address: '14 MG Road, Bengaluru, KA 560001', email: 'billing@northwind.example', taxId: 'GSTIN 29ABCDE1234F1Z5' },
    buyer: { name: 'Kaveri Hospitals Group', address: '7 Greams Road, Chennai, TN 600006', email: 'procurement@kaveri.example' },
    items: [
      { description: 'Appointment booking portal — UI build', quantity: 1, unitPrice: 68000 },
      { description: 'SMS reminder integration', quantity: 1, unitPrice: 14000 },
      { description: 'Monthly maintenance (October)', quantity: 1, unitPrice: 9000 },
    ],
    taxRate: 0.18,
    notes: 'Net 14 terms.',
  },
]

export function lineTotal(item: LineItem): number {
  return item.quantity * item.unitPrice
}

export function subtotal(inv: Invoice): number {
  return inv.items.reduce((sum, i) => sum + lineTotal(i), 0)
}

export function taxAmount(inv: Invoice): number {
  return subtotal(inv) * inv.taxRate
}

export function grandTotal(inv: Invoice): number {
  return subtotal(inv) + taxAmount(inv)
}

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
