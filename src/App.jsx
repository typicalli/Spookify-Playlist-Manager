import { useState } from 'react'
import PlaylistForm from './components/PlaylistForm.jsx'
import RegistryTable from './components/RegistryTable.jsx'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [view, setView] = useState('form')
  const [selectedId, setSelectedId] = useState(null)

  function handleAddTrack(track) {
    setTracks((prev) => [...prev, { ...track, id: Date.now() }])
    setView('table')
  }

  const selectedTrack = tracks.find((track) => track.id === selectedId)

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>
          Spookify <span className="accent">Playlist Manager</span>
        </h1>
        <p>Register a track to build out your playlist registry.</p>
      </header>

      <main className="app-main">
        <div className="view-tabs">
          <button
            type="button"
            className={view === 'form' ? 'tab active' : 'tab'}
            onClick={() => setView('form')}
          >
            Add Track Form
          </button>
          <button
            type="button"
            className={view === 'table' ? 'tab active' : 'tab'}
            onClick={() => setView('table')}
          >
            Registry Table View ({tracks.length})
          </button>
        </div>

        {view === 'form' ? (
          <section className="card">
            <h2>Add New Track</h2>
            <PlaylistForm onAddTrack={handleAddTrack} />
          </section>
        ) : (
          <section className="card">
            <h2>Registered Tracks</h2>
            {selectedTrack && (
              <p className="selected-hint">
                Selected: <strong>{selectedTrack.title}</strong> by {selectedTrack.artist}
              </p>
            )}
            <RegistryTable tracks={tracks} selectedId={selectedId} onSelectRow={setSelectedId} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
