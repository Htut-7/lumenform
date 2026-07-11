import { Link } from 'react-router-dom'
import ProductViewer3D from '../components/ProductViewer3D'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home() {
  const featured = products.slice(0, 3)

  return (
    <div>
      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', paddingTop: 56, paddingBottom: 56 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Sculptural lighting, form no. 01 — Ansa</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 450, fontSize: 54, lineHeight: 1.08, margin: '0 0 22px' }}>
            See the form<br /><em style={{ fontStyle: 'italic', color: 'var(--copper)' }}>before it ships.</em>
          </h1>
          <p style={{ color: 'var(--bone-dim)', fontSize: 16, lineHeight: 1.65, maxWidth: 440, marginBottom: 32 }}>
            Every piece in the studio is rendered in three dimensions, not photographed.
            Rotate it, study the proportions, decide if it belongs in your room before it's made.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link to="/shop" className="btn btn-solid">Browse the catalog</Link>
            <Link to="/product/ansa" className="btn">View Ansa →</Link>
          </div>
        </div>
        <ProductViewer3D form="arc" tone="#C9A227" height={460} />
      </section>

      <section className="container" style={{ padding: '56px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 450, margin: 0 }}>Recently cast</h2>
          <Link to="/shop" className="spec-label" style={{ color: 'var(--brass)' }}>View all →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
