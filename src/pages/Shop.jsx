import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  return (
    <div className="container" style={{ padding: '48px 24px 80px' }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Full catalog — {products.length} forms</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 450, margin: '0 0 40px' }}>Shop</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
