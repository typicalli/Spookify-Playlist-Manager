import { useState } from 'react'
import PlaylistForm from './components/PlaylistForm.jsx'
import './App.css'

function App() {
  const [tracks, setTracks] = useState([])

  function handleAddTrack(track) {
    setTracks((prev) => [...prev, { ...track, id: Date.now() }])
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>
          Spookify <span className="accent">Playlist Manager</span>
        </h1>
        <p>Register a track to build out your playlist registry.</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Add New Track</h2>
          <PlaylistForm onAddTrack={handleAddTrack} />
        </section>

        <section className="card">
          <h2>Registered Tracks ({tracks.length})</h2>
          {tracks.length === 0 ? (
            <p className="empty-state">No tracks yet. Fill out the form to add your first entry.</p>
          ) : (
            <ul className="track-list">
              {tracks.map((track) => (
                <li key={track.id} className="track-item">
                  <div className="track-item-main">
                    <span className="track-title">{track.title}</span>
                    <span className="track-genre">{track.genre}</span>
                  </div>
                  <div className="track-item-meta">
                    <span>{track.artist}</span>
                    <span>&bull;</span>
                    <span>{track.label}</span>
                    <span>&bull;</span>
                    <span>{track.rating} BPM</span>
                    <span>&bull;</span>
                    <span>{track.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
