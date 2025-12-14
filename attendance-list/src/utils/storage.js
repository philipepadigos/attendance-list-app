const KEY = 'attendance_entries_v1'

export function loadEntries() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    return []
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch (err) {
    // ignore
  }
}
