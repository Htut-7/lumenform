export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 'var(--space-6)' }}>
      <div className="container" style={{ padding: '40px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span className="spec-label">LUMENFORM — Made in the workshop, rendered in the browser.</span>
        <span className="spec-label">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
