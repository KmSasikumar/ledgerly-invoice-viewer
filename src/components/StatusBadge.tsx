import type { InvoiceStatus } from '../data/invoices'

const LABELS: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  draft: 'Draft',
}

export default function StatusBadge({ status }: { status: InvoiceStatus }) {
  return <span className={`badge badge-${status}`}>{LABELS[status]}</span>
}
