import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([]) // [{ id, qty }]
  const [ready, setReady] = useState(false)

  // Load cart: from Firestore if signed in, else from memory only.
  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user) {
        setReady(true)
        return
      }
      const ref = doc(db, 'carts', user.uid)
      const snap = await getDoc(ref)
      if (!cancelled) {
        setItems(snap.exists() ? snap.data().items || [] : [])
        setReady(true)
      }
    }
    setReady(false)
    load()
    return () => { cancelled = true }
  }, [user])

  // Persist to Firestore whenever items change, if signed in.
  useEffect(() => {
    if (!user || !ready) return
    const ref = doc(db, 'carts', user.uid)
    setDoc(ref, { items, updatedAt: serverTimestamp() }, { merge: true }).catch(() => {})
  }, [items, user, ready])

  const addItem = useCallback((productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId)
      if (existing) {
        return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: productId, qty }]
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId))
  }, [])

  const setQty = useCallback((productId, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== productId)
        : prev.map((i) => (i.id === productId ? { ...i, qty } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const value = { items, addItem, removeItem, setQty, clearCart, count, ready }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
