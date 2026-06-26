import { useState } from 'react'

export default function CustomOrder({ onBack }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="custom-page">
        <div className="custom-form-wrap">
          <div className="back-link" onClick={onBack}>← Back to site</div>
          <h1>Request received</h1>
          <p className="custom-intro">Thank you — this is a demo confirmation only. To make this live, connect the form to email or a backend so requests actually reach you.</p>
          <button className="liane-btn" onClick={onBack}>Back to site</button>
        </div>
      </div>
    )
  }

  return (
    <div className="custom-page">
      <div className="custom-form-wrap">
        <div className="back-link" onClick={onBack}>← Back to site</div>
        <h1>Request a custom piece</h1>
        <p className="custom-intro">Tell us what you're picturing — a matching set, an engraved symbol, a piece sized for someone specific. We'll follow up by email.</p>
        <form onSubmit={handleSubmit}>
          <div className="step-label">Contact</div>
          <div className="ck-row2">
            <input className="ck-input" placeholder="Full name" required />
            <input className="ck-input" placeholder="Email address" type="email" required />
          </div>
          <input className="ck-input full" placeholder="Phone (optional)" />

          <div className="step-label">The piece</div>
          <select className="ck-input full" defaultValue="">
            <option value="" disabled>Piece type</option>
            <option>Ring</option>
            <option>Necklace / pendant</option>
            <option>Bracelet</option>
            <option>Earrings</option>
            <option>Matching set</option>
          </select>
          <div className="ck-row2">
            <select className="ck-input" defaultValue="">
              <option value="" disabled>Material</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Not sure yet</option>
            </select>
            <input className="ck-input" placeholder="Budget (optional)" />
          </div>
          <textarea className="ck-input full ck-textarea" placeholder="Describe the piece — symbol, stone, who it's for, occasion..." rows={5}></textarea>

          <button className="liane-btn full" type="submit">Send request</button>
        </form>
      </div>
    </div>
  )
}
