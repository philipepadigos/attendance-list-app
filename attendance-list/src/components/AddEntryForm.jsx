import React, { useState } from 'react'

export default function AddEntryForm({ onAdd }) {
  const getLocalDate = () => {
    const today = new Date()
    return today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')
  }

  const [name, setName] = useState('')
  const [date, setDate] = useState(getLocalDate())
  const [status, setStatus] = useState('Present')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const entry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: name.trim(),
      date,
      status,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    }
    onAdd(entry)
    setName('')
    setNotes('')
    setDate(getLocalDate())
    setStatus('Present')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add Entry</h2>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      </label>
      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
        </select>
      </label>
      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn">Add</button>
      </div>
    </form>
  )
}
