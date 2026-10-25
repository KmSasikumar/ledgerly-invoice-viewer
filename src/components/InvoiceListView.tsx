import { useMemo, useState } from 'react'
import { invoices, grandTotal, formatMoney, type InvoiceStatus } from '../data/invoices'
import InvoiceListItem from './InvoiceListItem'
import InvoiceDocument from './InvoiceDocument'

type Filter = 'all' | InvoiceStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'draft', label: 'Draft' },
]

/** The original invoice-list/viewer view, kept as the second tab. */
export default function InvoiceListView() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState(invoices[0].id)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return invoices.filter((inv) => {
      if (filter !== 'all' && inv.status !== filter) return false
      if (!q) return true
      return (
        inv.number.toLowerCase().includes(q) ||
        inv.buyer.name.toLowerCase().includes(q) ||
        inv.items.some((i) => i.description.toLowerCase().includes(q))
      )
    })
  }, [query, filter])

  const selected =
    visible.find((inv) => inv.id === selectedId) ?? visible[0] ?? null

  const outstanding = invoices
    .filter((inv) => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + (inv.currency === 'INR' ? grandTotal(inv) : 0), 0)

  return (
    <>
      <div className="list-summary-row">
        <div className="summary" aria-label="Outstanding balance summary">
          <span className="summary-label">Outstanding (INR)</span>
          <span className="summary-value">{formatMoney(outstanding, 'INR')}</span>
        </div>
      </div>

      <main className="layout">
        <section className="panel" aria-label="Invoice list">
          <div className="controls">
            <input
              type="search"
              placeholder="Search number, client, or item…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search invoices"
            />
            <div className="filters" role="group" aria-label="Filter by status">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  className={filter === f.value ? 'chip chip-active' : 'chip'}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={filter === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="list">
            {visible.length === 0 && (
              <p className="empty">No invoices match your search.</p>
            )}
            {visible.map((inv) => (
              <InvoiceListItem
                key={inv.id}
                invoice={inv}
                selected={selected?.id === inv.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </section>

        <section className="viewer" aria-label="Invoice document">
          {selected ? (
            <>
              <InvoiceDocument invoice={selected} />
              <button type="button" className="print-btn" onClick={() => window.print()}>
                Print / save as PDF
              </button>
            </>
          ) : (
            <p className="empty">Select an invoice to view it.</p>
          )}
        </section>
      </main>
    </>
  )
}
