import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Nav() {
  const { user, logout } = useAuth()
  const { count } = useCart()

  return (
    <header style={{ borderBottom: '1px solid var(--line)', position: 'sticky', top: 0, background: 'rgba(22,20,15,0.9)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.01em' }}>
          LUMEN<span style={{ color: 'var(--copper)' }}>FORM</span>
        </Link>

        <nav style={{ display: 'flex', gap: 32, fontSize: 14 }}>
          <NavLink to="/shop" style={({ isActive }) => ({ color: isActive ? 'var(--brass)' : 'var(--bone)' })}>Shop</NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? 'var(--brass)' : 'var(--bone)' })}>
            Cart{count > 0 ? ` (${count})` : ''}
          </NavLink>
          {user ? (
            <>
              <NavLink to="/account" style={({ isActive }) => ({ color: isActive ? 'var(--brass)' : 'var(--bone)' })}>Account</NavLink>
              <button onClick={logout} className="spec-label" style={{ background: 'none', border: 'none', color: 'var(--bone-dim)' }}>
                Sign out
              </button>
            </>
          ) : (
            <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'var(--brass)' : 'var(--bone)' })}>Sign in</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
