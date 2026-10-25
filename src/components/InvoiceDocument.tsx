import {
  type Invoice,
  lineTotal,
  subtotal,
  taxAmount,
  grandTotal,
  formatMoney,
  formatDate,
} from '../data/invoices'
import StatusBadge from './StatusBadge'

export default function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  const fmt = (n: number) => formatMoney(n, invoice.currency)
  return (
    <article className="document" aria-label={`Invoice ${invoice.number}`}>
      <header className="doc-header">
        <div>
          <h2 className="doc-title">INVOICE</h2>
          <p className="doc-number">{invoice.number}</p>
        </div>
        <StatusBadge status={invoice.status} />
      </header>

      <section className="doc-parties">
        <div>
          <h3>From</h3>
          <p className="party-name">{invoice.seller.name}</p>
          <p>{invoice.seller.address}</p>
          <p>{invoice.seller.email}</p>
          <p>{invoice.seller.taxId}</p>
        </div>
        <div>
          <h3>Bill to</h3>
          <p className="party-name">{invoice.buyer.name}</p>
          <p>{invoice.buyer.address}</p>
          <p>{invoice.buyer.email}</p>
        </div>
        <div className="doc-dates">
          <h3>Details</h3>
          <p>
            <span>Issued</span> {formatDate(invoice.issueDate)}
          </p>
          <p>
            <span>Due</span> {formatDate(invoice.dueDate)}
          </p>
          <p>
            <span>Currency</span> {invoice.currency}
          </p>
        </div>
      </section>

      <table className="doc-table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col" className="num">Qty</th>
            <th scope="col" className="num">Unit price</th>
            <th scope="col" className="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td>{item.description}</td>
              <td className="num">{item.quantity}</td>
              <td className="num">{fmt(item.unitPrice)}</td>
              <td className="num">{fmt(lineTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="doc-totals">
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{fmt(subtotal(invoice))}</dd>
          </div>
          <div>
            <dt>Tax ({(invoice.taxRate * 100).toFixed(0)}%)</dt>
            <dd>{fmt(taxAmount(invoice))}</dd>
          </div>
          <div className="grand">
            <dt>Total due</dt>
            <dd>{fmt(grandTotal(invoice))}</dd>
          </div>
        </dl>
      </section>

      <footer className="doc-notes">
        <h3>Notes</h3>
        <p>{invoice.notes}</p>
      </footer>
    </article>
  )
}
