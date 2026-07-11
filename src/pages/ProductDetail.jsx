import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ProductViewer3D from '../components/ProductViewer3D'
import { getProduct } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) return <Navigate to="/shop" replace />

  function handleAdd() {
    addItem(product.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <Link to="/shop" className="spec-label" style={{ color: 'var(--bone-dim)' }}>← Back to shop</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, marginTop: 24 }}>
        <div style={{ background: 'var(--ink-card)', border: '1px solid var(--line)', borderRadius: 2 }}>
          <ProductViewer3D form={product.form} tone={product.tone} interactive height={520} />
          <div className="spec-label" style={{ textAlign: 'center', padding: '0 0 16px' }}>drag to rotate · scroll to zoom</div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>{product.material}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 450, margin: '0 0 16px' }}>{product.name}</h1>
          <p style={{ color: 'var(--bone-dim)', fontSize: 15.5, lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>{product.blurb}</p>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, marginBottom: 28 }}>${product.price}</div>

          <button onClick={handleAdd} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '15px', marginBottom: 32 }}>
            {added ? 'Added to cart ✓' : 'Add to cart'}
          </button>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              <SpecRow label="Material" value={product.material} />
              <SpecRow label="Dimensions" value={product.dimensions} />
              <SpecRow label="Wattage" value={product.wattage} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <tr style={{ borderTop: '1px solid var(--line)' }}>
      <td className="spec-label" style={{ padding: '12px 0', width: 140 }}>{label}</td>
      <td style={{ padding: '12px 0', color: 'var(--bone)' }}>{value}</td>
    </tr>
  )
}
