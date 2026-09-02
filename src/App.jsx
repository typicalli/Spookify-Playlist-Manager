import { useState } from 'react'
import PlaylistForm from './components/PlaylistForm.jsx'
import RegistryTable from './components/RegistryTable.jsx'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  function handleAddTrack(track) {
    const newTrack = { ...track, id: Date.now() }
    setTracks((prev) => [...prev, newTrack])
    setSelectedId(newTrack.id)
  }

  const selectedTrack = tracks.find((track) => track.id === selectedId)

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
            {selectedTrack && (
              <p className="selected-hint">
                Selected: <strong>{selectedTrack.title}</strong> by {selectedTrack.artist}
              </p>
            )}
          </div>

          <div className="main-scroll">
            <div className="registry-panel">
              <RegistryTable tracks={tracks} selectedId={selectedId} onSelectRow={setSelectedId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
