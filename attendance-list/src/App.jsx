import React, { useEffect, useState } from 'react'
import './App.css'
import AddEntryForm from './components/AddEntryForm'
import AttendanceList from './components/AttendanceList'
import { loadEntries, saveEntries } from './utils/storage'

function App() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    setEntries(loadEntries())
  }, [])

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const addEntry = (entry) => setEntries((s) => [entry, ...s])
  const updateEntry = (updated) => setEntries((s) => s.map((e) => (e.id === updated.id ? updated : e)))
  const deleteEntry = (id) => setEntries((s) => s.filter((e) => e.id !== id))
  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
      setEntries([])
    }
  }

  const exportCSV = () => {
    if (!entries.length) return
    const headers = ['Name', 'Date', 'Status', 'Notes', 'Created At']
    const rows = entries.map((e) => [e.name, e.date, e.status, e.notes || '', e.createdAt])
    const csvRows = [headers.join(',')]
    rows.forEach((row) => {
      csvRows.push(row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    })
    const csv = csvRows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const today = new Date()
    const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')
    a.download = `attendance-${localDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header className="app-header">Attendance List</header>
      <main className="app-main">
        <section className="panel form-panel">
          <AddEntryForm onAdd={addEntry} />
        </section>
        <section className="panel list-panel">
          <div className="toolbar">
            <button onClick={exportCSV} disabled={!entries.length} className="btn">
              Export CSV
            </button>
            <button onClick={clearAll} disabled={!entries.length} className="btn danger">
              Clear All
            </button>
          </div>
          <AttendanceList entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />
        </section>
      </main>
    </div>
  )
}

export default App
