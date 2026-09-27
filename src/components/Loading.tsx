export default function Loading() {
  return (
    <div className="state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading…</p>
    </div>
  )
}
