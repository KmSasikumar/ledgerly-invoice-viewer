import type { ExtractedField } from '../data/extractedFields'
import { boxStyle } from '../data/extractedFields'

interface Props {
  fields: ExtractedField[]
}

/**
 * Built-in sample invoice, rendered so the mock field boxes land on the
 * matching text: invoice number top-left, date top-right, total near the
 * bottom. The three values are placed at exactly the mock box coordinates
 * (as percentages of the 640x800 space); editing a field updates the text
 * shown here too. The line items sum to the original total of 48,250.00.
 */
export default function SampleDocument({ fields }: Props) {
  const byId = (id: string) => fields.find((f) => f.id === id)?.value ?? ''
  return (
    <div className="sample-doc" aria-label="Sample invoice document">
      <div className="sd-title">INVOICE</div>

      <span className="sd-label sd-label-inv">Invoice no.</span>
      <span className="sd-value" style={boxStyle([120, 80, 260, 100])}>
        {byId('invoicenumber')}
      </span>

      <span className="sd-label sd-label-date">Date</span>
      <span className="sd-value" style={boxStyle([400, 80, 520, 100])}>
        {byId('date')}
      </span>

      <div className="sd-body">
        <div className="sd-parties">
          <div>
            <h3>From</h3>
            <p className="sd-name">Northwind Studio</p>
            <p>14 MG Road, Bengaluru, KA 560001</p>
            <p>billing@northwind.example</p>
          </div>
          <div>
            <h3>Bill to</h3>
            <p className="sd-name">Acme Retail Pvt Ltd</p>
            <p>88 Residency Road, Bengaluru, KA 560025</p>
            <p>ap@acme.example</p>
          </div>
        </div>

        <table className="sd-table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col" className="num">Qty</th>
              <th scope="col" className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Website development</td>
              <td className="num">1</td>
              <td className="num">30,000.00</td>
            </tr>
            <tr>
              <td>Brand design</td>
              <td className="num">1</td>
              <td className="num">12,000.00</td>
            </tr>
            <tr>
              <td>Annual hosting</td>
              <td className="num">1</td>
              <td className="num">6,250.00</td>
            </tr>
          </tbody>
        </table>

        <div className="sd-subtotal">
          <span>Subtotal</span>
          <span>48,250.00</span>
        </div>
        <p className="sd-note">
          Total shown is the extracted value from the provided mock JSON, not a
          recomputed sum.
        </p>
      </div>

      <span className="sd-label sd-label-total">Total due</span>
      <span className="sd-value sd-total" style={boxStyle([400, 620, 520, 645])}>
        {byId('totalamount')}
      </span>
    </div>
  )
}
