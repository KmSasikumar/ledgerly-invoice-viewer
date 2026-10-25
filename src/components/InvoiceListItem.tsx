import {
  type Invoice,
  formatMoney,
  formatDate,
  grandTotal,
} from '../data/invoices'
import StatusBadge from './StatusBadge'

interface Props {
  invoice: Invoice
  selected: boolean
  onSelect: (id: string) => void
}

export default function InvoiceListItem({ invoice, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`list-item${selected ? ' list-item-active' : ''}`}
      onClick={() => onSelect(invoice.id)}
      aria-current={selected}
    >
      <span className="list-item-top">
        <span className="list-item-number">{invoice.number}</span>
        <StatusBadge status={invoice.status} />
      </span>
      <span className="list-item-buyer">{invoice.buyer.name}</span>
      <span className="list-item-meta">
        <span>Due {formatDate(invoice.dueDate)}</span>
        <span className="list-item-amount">
          {formatMoney(grandTotal(invoice), invoice.currency)}
        </span>
      </span>
    </button>
  )
}
