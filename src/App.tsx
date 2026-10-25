import { useState } from 'react'
import DocumentReview from './components/DocumentReview'
import InvoiceListView from './components/InvoiceListView'

export default function App() {
  const [tab, setTab] = useState<'review' | 'list'>('review')

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Ledgerly</h1>
          <p className="subtitle">
            Invoice document review — upload, verify, correct
          </p>
        </div>
        <nav className="tabs" aria-label="Views">
          <button
            type="button"
            className={tab === 'review' ? 'tab tab-active' : 'tab'}
            onClick={() => setTab('review')}
          >
            Review document
          </button>
          <button
            type="button"
            className={tab === 'list' ? 'tab tab-active' : 'tab'}
            onClick={() => setTab('list')}
          >
            Invoice list
          </button>
        </nav>
      </header>

      {tab === 'review' ? <DocumentReview /> : <InvoiceListView />}
    </div>
  )
}
