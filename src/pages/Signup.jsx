import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Field, friendlyError } from './Login'

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signup(email, password, name)
      navigate('/account')
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
      navigate('/account')
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container" style={{ padding: '64px 24px', maxWidth: 400 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 450, margin: '0 0 32px' }}>Create account</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field label="Password" type="password" value={password} onChange={setPassword} required />
        {error && <div style={{ color: 'var(--copper)', fontSize: 13 }}>{error}</div>}
        <button className="btn btn-solid" disabled={busy} style={{ justifyContent: 'center', padding: '14px', marginTop: 8 }}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <div className="spec-label" style={{ textAlign: 'center', margin: '20px 0' }}>or</div>

      <button onClick={handleGoogle} disabled={busy} className="btn" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
        Continue with Google
      </button>

      <div className="spec-label" style={{ marginTop: 24 }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--brass)' }}>Sign in →</Link>
      </div>
    </div>
  )
}
