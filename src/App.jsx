import { useMemo, useState } from 'react'
import PlaylistForm from './components/PlaylistForm.jsx'
import RegistryTable from './components/RegistryTable.jsx'
import ItemDetails from './components/ItemDetails.jsx'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  function handleAddTrack(track) {
    const newTrack = { ...track, id: Date.now() }
    setTracks((prev) => [...prev, newTrack])
    setSelectedId(newTrack.id)
  }

  function handleDeleteTrack(id) {
    setTracks((prev) => prev.filter((track) => track.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }

  const selectedTrack = tracks.find((track) => track.id === selectedId)

  const stats = useMemo(() => {
    if (tracks.length === 0) {
      return { total: 0, avgRating: null, topGenre: null }
    }

    const total = tracks.length
    const avgRating = Math.round((tracks.reduce((sum, track) => sum + track.rating, 0) / total) * 10) / 10

    const genreCounts = tracks.reduce((counts, track) => {
      counts[track.genre] = (counts[track.genre] || 0) + 1
      return counts
    }, {})
    const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0]

    return { total, avgRating, topGenre }
  }, [tracks])

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>
          Spookify <span className="accent">Playlist Manager</span>
        </h1>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-card">
            <h2>Add New Track</h2>
            <PlaylistForm onAddTrack={handleAddTrack} />
          </div>
        </aside>

        <main className="main-content">
          <div className="main-header">
            <div>
              <h2>Registry</h2>
              <p className="main-subtitle">
                {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'} registered
              </p>
            </div>
          </div>

          <div className="main-scroll">
            <div className="stats-bar">
              <div className="stat-card">
                <span className="stat-label">Total Tracks</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Average Rating / BPM</span>
                <span className="stat-value">{stats.avgRating ?? '—'}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Top Genre</span>
                <span className="stat-value">{stats.topGenre ?? '—'}</span>
              </div>
            </div>

            <div className="main-grid">
              <div className="registry-panel">
                <RegistryTable
                  tracks={tracks}
                  selectedId={selectedId}
                  onSelectRow={setSelectedId}
                  onDeleteTrack={handleDeleteTrack}
                />
              </div>

              <ItemDetails track={selectedTrack} onDelete={handleDeleteTrack} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
