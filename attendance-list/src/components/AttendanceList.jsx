import React, { useMemo, useState } from 'react'
import EntryItem from './EntryItem'

export default function AttendanceList({ entries = [], onUpdate, onDelete }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (statusFilter !== 'All' && e.status !== statusFilter) return false
      if (!query) return true
      return e.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [entries, query, statusFilter])

  return (
    <div className="attendance-list">
      <div className="list-controls">
        <input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
        </select>
      </div>
      <div className="list-items">
        {filtered.length ? (
          filtered.map((entry) => (
            <EntryItem key={entry.id} entry={entry} onUpdate={onUpdate} onDelete={onDelete} />
          ))
        ) : (
          <div className="empty">No entries</div>
        )}
      </div>
    </div>
  )
}
