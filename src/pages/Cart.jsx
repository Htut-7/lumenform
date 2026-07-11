import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getProduct } from '../data/products'

export default function Cart() {
  const { items, setQty, removeItem, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const lines = items
    .map((i) => ({ ...i, product: getProduct(i.id) }))
    .filter((l) => l.product)

  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)

  function handleCheckout() {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="container" style={{ padding: '48px 24px 80px', maxWidth: 780 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 450, margin: '0 0 32px' }}>Your cart</h1>

      {lines.length === 0 ? (
        <div style={{ color: 'var(--bone-dim)' }}>
          Nothing here yet. <Link to="/shop" style={{ color: 'var(--brass)' }}>Browse the catalog →</Link>
        </div>
      ) : (
        <>
          {lines.map((l) => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{l.product.name}</div>
                <div className="spec-label">${l.product.price} each</div>
              </div>
              <input
                type="number"
                min={1}
                value={l.qty}
                onChange={(e) => setQty(l.id, parseInt(e.target.value, 10) || 0)}
                style={{ width: 56, background: 'var(--ink-card)', border: '1px solid var(--line)', color: 'var(--bone)', padding: '8px', textAlign: 'center' }}
              />
              <div style={{ fontFamily: 'var(--font-mono)', width: 70, textAlign: 'right' }}>${l.product.price * l.qty}</div>
              <button onClick={() => removeItem(l.id)} className="spec-label" style={{ background: 'none', border: 'none', color: 'var(--copper)' }}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '28px 0 8px', fontFamily: 'var(--font-mono)', fontSize: 20 }}>
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
            <button onClick={handleCheckout} className="btn btn-solid" style={{ flex: 1, justifyContent: 'center', padding: '15px' }}>
              {user ? 'Checkout' : 'Sign in to checkout'}
            </button>
            <button onClick={clearCart} className="btn">Clear cart</button>
          </div>
        </>
      )}
    </div>
  )
}
