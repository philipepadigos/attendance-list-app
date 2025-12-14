import React, { useState } from 'react'

export default function EntryItem({ entry, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...entry })

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = () => {
    onUpdate({ ...form })
    setEditing(false)
  }

  const cancel = () => {
    setForm({ ...entry })
    setEditing(false)
  }

  return (
    <div className="entry-item">
      {editing ? (
        <div className="entry-edit">
          <input value={form.name} onChange={handleChange('name')} />
          <input type="date" value={form.date} onChange={handleChange('date')} />
          <select value={form.status} onChange={handleChange('status')}>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
          </select>
          <textarea value={form.notes} onChange={handleChange('notes')} rows={2} />
          <div className="entry-actions">
            <button className="btn" onClick={save}>Save</button>
            <button className="btn" onClick={cancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="entry-view">
          <div className="entry-main">
            <div className="entry-name">{entry.name}</div>
            <div className="entry-meta">{entry.date} • {entry.status}</div>
            {entry.notes ? <div className="entry-notes">{entry.notes}</div> : null}
          </div>
          <div className="entry-actions">
            <button className="btn" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}
