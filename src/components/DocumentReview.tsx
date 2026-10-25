import { useLayoutEffect, useRef, useState } from 'react'
import SampleDocument from './SampleDocument'
import {
  DOC_H,
  DOC_W,
  MOCK_FIELDS,
  boxStyle,
  stamp,
  type ChangeEntry,
  type ExtractedField,
} from '../data/extractedFields'

type DocKind = 'sample' | 'image' | 'pdf'

interface DraftBox {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface NewFieldForm {
  bbox: [number, number, number, number]
  name: string
  value: string
}

let logSeq = 1

/**
 * Core take-home flow: upload a PDF/image (or use the sample document),
 * review the extracted fields in the side panel, click a field to highlight
 * its box on the document, approve or edit values, and draw a new box to
 * add a field. Fields come from the provided mock JSON — no OCR runs here.
 */
export default function DocumentReview() {
  const [docKind, setDocKind] = useState<DocKind>('sample')
  const [docUrl, setDocUrl] = useState<string | null>(null)
  const [docName, setDocName] = useState('')
  const [fields, setFields] = useState<ExtractedField[]>(MOCK_FIELDS)
  const [selectedId, setSelectedId] = useState<string | null>('invoicenumber')
  const [log, setLog] = useState<ChangeEntry[]>([])
  const [drawMode, setDrawMode] = useState(false)
  const [draft, setDraft] = useState<DraftBox | null>(null)
  const [form, setForm] = useState<NewFieldForm | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  // Scale for the sample document: the stage keeps a 640x800 ratio at any
  // width, so the fixed 640x800 sample canvas is scaled as one unit. This
  // keeps field values and highlight boxes aligned with the document text
  // on narrow screens, where flowed HTML would otherwise drift apart.
  const [stageScale, setStageScale] = useState(1)
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setStageScale(w / DOC_W)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const pushLog = (text: string) =>
    setLog((entries) => [{ id: logSeq++, text, at: stamp() }, ...entries])

  const useSample = () => {
    if (docUrl) URL.revokeObjectURL(docUrl)
    setDocUrl(null)
    setDocName('')
    setDocKind('sample')
    setNotice(null)
  }

  const resetDemo = () => {
    useSample()
    setFields(MOCK_FIELDS)
    setSelectedId('invoicenumber')
    setLog([])
    setDrawMode(false)
    setDraft(null)
    setForm(null)
    setEditingId(null)
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const isImage = file.type.startsWith('image/')
    const isPdf =
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isImage && !isPdf) {
      setNotice('Only PDF or image uploads are supported.')
      return
    }
    if (docUrl) URL.revokeObjectURL(docUrl)
    setDocUrl(URL.createObjectURL(file))
    setDocName(file.name)
    setDocKind(isImage ? 'image' : 'pdf')
    setNotice(null)
  }

  const approve = (field: ExtractedField) => {
    setFields((all) =>
      all.map((f) => (f.id === field.id ? { ...f, approved: true } : f)),
    )
    pushLog(`Approved ${field.label}: ${field.value}`)
  }

  const saveEdit = (field: ExtractedField) => {
    const next = editDraft.trim()
    setEditingId(null)
    if (!next || next === field.value) return
    setFields((all) =>
      all.map((f) =>
        f.id === field.id ? { ...f, value: next, approved: false } : f,
      ),
    )
    pushLog(`Edited ${field.label}: ${field.value} → ${next}`)
  }

  const stagePoint = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return null
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)),
    }
  }

  const onStageDown = (e: React.PointerEvent) => {
    if (!drawMode) return
    const p = stagePoint(e)
    if (!p) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDraft({ x1: p.x, y1: p.y, x2: p.x, y2: p.y })
  }

  const onStageMove = (e: React.PointerEvent) => {
    if (!drawMode || !draft) return
    const p = stagePoint(e)
    if (!p) return
    setDraft({ ...draft, x2: p.x, y2: p.y })
  }

  const onStageUp = () => {
    if (!drawMode || !draft) return
    const { x1, y1, x2, y2 } = draft
    setDraft(null)
    if (Math.abs(x2 - x1) < 2 || Math.abs(y2 - y1) < 2) return
    const bbox: [number, number, number, number] = [
      Math.round((Math.min(x1, x2) / 100) * DOC_W),
      Math.round((Math.min(y1, y2) / 100) * DOC_H),
      Math.round((Math.max(x1, x2) / 100) * DOC_W),
      Math.round((Math.max(y1, y2) / 100) * DOC_H),
    ]
    setForm({ bbox, name: '', value: '' })
    setDrawMode(false)
  }

  const saveForm = () => {
    if (!form) return
    const name = form.name.trim()
    const value = form.value.trim()
    if (!name || !value) {
      setNotice('Give the new field a name and a value.')
      return
    }
    const field: ExtractedField = {
      id: `manual-${Date.now()}`,
      label: name,
      value,
      bbox: form.bbox,
      source: 'manual',
      approved: false,
    }
    setFields((all) => [...all, field])
    setSelectedId(field.id)
    pushLog(`Added field ${name} = ${value}`)
    setForm(null)
    setNotice(null)
  }

  const draftStyle = draft
    ? {
        left: `${Math.min(draft.x1, draft.x2)}%`,
        top: `${Math.min(draft.y1, draft.y2)}%`,
        width: `${Math.abs(draft.x2 - draft.x1)}%`,
        height: `${Math.abs(draft.y2 - draft.y1)}%`,
      }
    : undefined

  return (
    <div className="review">
      <div className="review-toolbar">
        <label className="tool-btn upload-btn">
          Upload PDF or image
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={onFile}
            hidden
          />
        </label>
        <button
          type="button"
          className="tool-btn"
          onClick={useSample}
          disabled={docKind === 'sample'}
        >
          Use sample document
        </button>
        <button
          type="button"
          className={drawMode ? 'tool-btn draw-active' : 'tool-btn'}
          onClick={() => setDrawMode((d) => !d)}
        >
          {drawMode ? 'Drawing… drag on the document' : 'Draw a new box'}
        </button>
        <button type="button" className="tool-btn" onClick={resetDemo}>
          Reset demo
        </button>
      </div>
      {notice && <p className="review-notice">{notice}</p>}

      <div className="review-layout">
        <section className="review-panel" aria-label="Extracted fields">
          <h2>Extracted fields</h2>
          <p className="mock-note">
            From the provided mock JSON — not a live extraction. Click a field
            to highlight its box on the document.
          </p>
          {docKind !== 'sample' && (
            <p className="mock-note">
              On your own upload, highlight positions still come from the mock
              JSON, so they mark the same relative spots rather than detected
              text.
            </p>
          )}
          <div className="field-list">
            {fields.map((f) => (
              <div
                key={f.id}
                className={
                  f.id === selectedId
                    ? 'field-row field-selected'
                    : 'field-row'
                }
                onClick={() => setSelectedId(f.id)}
              >
                <div className="field-top">
                  <span className="field-label">{f.label}</span>
                  <span
                    className={
                      f.source === 'mock'
                        ? 'badge-source badge-mock'
                        : 'badge-source badge-manual'
                    }
                  >
                    {f.source === 'mock' ? 'mock JSON' : 'added by hand'}
                  </span>
                  {f.approved && (
                    <span className="badge-source badge-approved">
                      Approved
                    </span>
                  )}
                </div>
                {editingId === f.id ? (
                  <div
                    className="field-edit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(f)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      autoFocus
                      aria-label={`Edit ${f.label}`}
                    />
                    <button type="button" onClick={() => saveEdit(f)}>
                      Save
                    </button>
                    <button type="button" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="field-value">{f.value}</div>
                    <div
                      className="field-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => approve(f)}
                        disabled={f.approved}
                      >
                        {f.approved ? 'Approved ✓' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(f.id)
                          setEditDraft(f.value)
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <h2>Change log</h2>
          {log.length === 0 ? (
            <p className="empty">
              No changes yet. Edits and added fields appear here with the old
              value, the new value, and a timestamp.
            </p>
          ) : (
            <ol className="change-log">
              {log.map((entry) => (
                <li key={entry.id}>
                  <span>{entry.text}</span>
                  <time>{entry.at}</time>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="review-stage-wrap">
          <div
            ref={stageRef}
            className="doc-stage"
            onPointerDown={onStageDown}
            onPointerMove={onStageMove}
            onPointerUp={onStageUp}
          >
            {docKind === 'sample' && (
              <SampleDocument fields={fields} scale={stageScale} />
            )}
            {docKind === 'image' && docUrl && (
              <img className="doc-media" src={docUrl} alt={docName} />
            )}
            {docKind === 'pdf' && docUrl && (
              <embed className="doc-media" src={docUrl} type="application/pdf" />
            )}
            <div className={`overlay ${drawMode ? 'draw-mode' : ''}`}>
              {fields.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={
                    f.id === selectedId
                      ? 'hl-box hl-selected'
                      : 'hl-box hl-faint'
                  }
                  style={boxStyle(f.bbox)}
                  onClick={() => setSelectedId(f.id)}
                  aria-label={`Highlight ${f.label}`}
                >
                  <span>{f.label}</span>
                </button>
              ))}
              {draft && <div className="hl-draft" style={draftStyle} />}
            </div>
          </div>
          {drawMode && (
            <p className="draw-hint">
              Draw mode: drag on the document to outline a new field.
            </p>
          )}
          {form && (
            <form
              className="inline-form"
              onSubmit={(e) => {
                e.preventDefault()
                saveForm()
              }}
            >
              <h3>Add field from your box</h3>
              <label>
                Field name
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. Discount"
                  autoFocus
                />
              </label>
              <label>
                Value
                <input
                  value={form.value}
                  onChange={(e) =>
                    setForm({ ...form, value: e.target.value })
                  }
                  placeholder="e.g. 2,000.00"
                />
              </label>
              <div className="field-actions">
                <button type="submit">Add field</button>
                <button type="button" onClick={() => setForm(null)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
          <p className="doc-caption">
            {docKind === 'sample'
              ? 'Sample invoice document (640 × 800 coordinate space)'
              : docName}
          </p>
        </section>
      </div>
    </div>
  )
}
