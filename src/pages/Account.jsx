import { useEffect, useState } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { getProduct } from '../data/products'

export default function Account() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    async function load() {
      const q = query(collection(db, 'orders'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    load().catch(() => setLoading(false))
  }, [user])

  if (!user) return null

  return (
    <div className="container" style={{ padding: '48px 24px 80px', maxWidth: 640 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Account</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 450, margin: '0 0 6px' }}>
        {user.displayName || user.email}
      </h1>
      <p style={{ color: 'var(--bone-dim)', marginBottom: 40 }}>{user.email}</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 450, marginBottom: 16 }}>Order history</h2>

      {loading ? (
        <div className="spec-label">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="spec-label">No orders yet.</div>
      ) : (
        orders.map((o) => (
          <div key={o.id} style={{ borderTop: '1px solid var(--line)', padding: '16px 0' }}>
            <div className="spec-label" style={{ marginBottom: 6 }}>
              {o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString() : ''} · #{o.id.slice(0, 8)}
            </div>
            {(o.items || []).map((it) => {
              const p = getProduct(it.id)
              return p ? <div key={it.id} style={{ fontSize: 14 }}>{p.name} × {it.qty}</div> : null
            })}
            <div style={{ fontFamily: 'var(--font-mono)', marginTop: 6 }}>${o.total}</div>
          </div>
        ))
      )}
    </div>
  )
}
