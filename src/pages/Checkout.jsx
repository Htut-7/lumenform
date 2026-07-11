import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'

// Note: this is a demo checkout — it records the order in Firestore but does
// not process real payment. Wire in Stripe (or similar) before going live.
export default function Checkout() {
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)

  const lines = items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product)
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)

  async function placeOrder() {
    setPlacing(true)
    try {
      await addDoc(collection(db, 'orders'), {
        uid: user.uid,
        items,
        total,
        createdAt: serverTimestamp(),
      })
      clearCart()
      navigate('/account')
    } finally {
      setPlacing(false)
    }
  }

  if (lines.length === 0) {
    return (
      <div className="container" style={{ padding: '64px 24px' }}>
        <div className="spec-label">Your cart is empty.</div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '48px 24px 80px', maxWidth: 560 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 450, margin: '0 0 8px' }}>Checkout</h1>
      <p className="spec-label" style={{ marginBottom: 32 }}>Demo checkout — no payment is processed.</p>

      {lines.map((l) => (
        <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}>
          <span>{l.product.name} × {l.qty}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>${l.product.price * l.qty}</span>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontFamily: 'var(--font-mono)', fontSize: 20 }}>
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button onClick={placeOrder} disabled={placing} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>
        {placing ? 'Placing order…' : 'Place order'}
      </button>
    </div>
  )
}
