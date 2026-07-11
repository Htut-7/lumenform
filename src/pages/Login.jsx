import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(dest)
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setBusy(true)
    try {
      await loginWithGoogle()
      navigate(dest)
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container" style={{ padding: '64px 24px', maxWidth: 400 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 450, margin: '0 0 32px' }}>Sign in</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={password} onChange={setPassword} required />
        {error && <div style={{ color: 'var(--copper)', fontSize: 13 }}>{error}</div>}
        <button className="btn btn-solid" disabled={busy} style={{ justifyContent: 'center', padding: '14px', marginTop: 8 }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="spec-label" style={{ textAlign: 'center', margin: '20px 0' }}>or</div>

      <button onClick={handleGoogle} disabled={busy} className="btn" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
        Continue with Google
      </button>

      <div className="spec-label" style={{ marginTop: 24 }}>
        No account? <Link to="/signup" style={{ color: 'var(--brass)' }}>Create one →</Link>
      </div>
    </div>
  )
}

export function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="spec-label">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{ background: 'var(--ink-card)', border: '1px solid var(--line)', color: 'var(--bone)', padding: '12px', fontSize: 15 }}
      />
    </label>
  )
}

export function friendlyError(err) {
  const code = err?.code || ''
  if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
    return 'Incorrect email or password.'
  }
  if (code.includes('email-already-in-use')) return 'An account already exists with that email.'
  if (code.includes('weak-password')) return 'Password should be at least 6 characters.'
  if (code.includes('popup-closed-by-user')) return 'Sign-in was cancelled.'
  return 'Something went wrong. Please try again.'
}
