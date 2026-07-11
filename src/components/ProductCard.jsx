import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductViewer3D from './ProductViewer3D'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: 'var(--ink-card)',
        border: '1px solid var(--line)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
        borderColor: hovered ? 'var(--brass)' : 'var(--line)',
      }}
    >
      <ProductViewer3D form={product.form} tone={product.tone} interactive={false} spin={hovered} height={260} />
      <div style={{ padding: '18px 20px 22px' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>{product.material}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, marginBottom: 10 }}>{product.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="spec-label">{product.dimensions}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--bone)' }}>${product.price}</span>
        </div>
      </div>
    </Link>
  )
}
