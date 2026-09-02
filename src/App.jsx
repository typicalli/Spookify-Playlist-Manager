import { useState } from 'react'
import PlaylistForm from './components/PlaylistForm.jsx'
import RegistryTable from './components/RegistryTable.jsx'
import ItemDetails from './components/ItemDetails.jsx'
import './App.css'

const initialTracks = [
  { id: 1, title: 'Espresso', artist: 'Sabrina Carpenter', genre: 'Pop', rating: 95, label: 'Island Records', role: 'Creator' },
  { id: 2, title: 'Birds of a Feather', artist: 'Billie Eilish', genre: 'Pop', rating: 98, label: 'Interscope Records', role: 'Creator' },
  { id: 3, title: 'Please Please Please', artist: 'Sabrina Carpenter', genre: 'Pop', rating: 92, label: 'Island Records', role: 'Listener' },
  { id: 4, title: 'Supernova', artist: 'aespa', genre: 'K-Pop', rating: 96, label: 'SM Entertainment', role: 'Creator' },
  { id: 5, title: 'Magnetic', artist: 'ILLIT', genre: 'K-Pop', rating: 90, label: 'BELIFT LAB', role: 'Listener' },
  { id: 6, title: 'Good Luck, Babe!', artist: 'Chappell Roan', genre: 'Indie', rating: 97, label: 'Amusement Records', role: 'Creator' },
  { id: 7, title: 'Not Like Us', artist: 'Kendrick Lamar', genre: 'Rock', rating: 99, label: 'pgLang / Interscope', role: 'Creator' },
  { id: 8, title: 'Spot!', artist: 'ZICO, JENNIE', genre: 'K-Pop', rating: 91, label: 'KOZ Entertainment', role: 'Listener' },
  { id: 9, title: 'Houdini', artist: 'Dua Lipa', genre: 'Pop', rating: 88, label: 'Warner Records', role: 'Creator' },
  { id: 10, title: 'Too Sweet', artist: 'Hozier', genre: 'Indie', rating: 94, label: 'Rubyworks / Columbia', role: 'Listener' },
  { id: 11, title: 'A Bar Song (Tipsy)', artist: 'Shaboozey', genre: 'Rock', rating: 89, label: 'American Dogwood / EMPIRE', role: 'Creator' },
  { id: 12, title: 'Armageddon', artist: 'aespa', genre: 'K-Pop', rating: 93, label: 'SM Entertainment', role: 'Creator' },
  { id: 13, title: 'Million Dollar Baby', artist: 'Tommy Richman', genre: 'Indie', rating: 90, label: 'ISO Supremacy / PULSE', role: 'Listener' },
  { id: 14, title: 'Fortnight', artist: 'Taylor Swift ft. Post Malone', genre: 'Pop', rating: 87, label: 'Republic Records', role: 'Creator' },
  { id: 15, title: 'SHEESH', artist: 'BABYMONSTER', genre: 'K-Pop', rating: 85, label: 'YG Entertainment', role: 'Listener' },
  { id: 16, title: 'Lunch', artist: 'Billie Eilish', genre: 'Indie', rating: 91, label: 'Interscope Records', role: 'Creator' },
  { id: 17, title: 'Slow Dancing in the Dark', artist: 'Joji', genre: 'Jazz', rating: 93, label: '88rising', role: 'Listener' },
  { id: 18, title: 'Get Lucky', artist: 'Daft Punk ft. Pharrell Williams', genre: 'Jazz', rating: 96, label: 'Columbia Records', role: 'Creator' },
  { id: 19, title: 'Red Ruby Da Sleeze', artist: 'Nicki Minaj', genre: 'Rock', rating: 86, label: 'Republic Records', role: 'Listener' },
  { id: 20, title: 'How Sweet', artist: 'NewJeans', genre: 'K-Pop', rating: 94, label: 'ADOR', role: 'Creator' },
]

function App() {
  const [tracks, setTracks] = useState(initialTracks)
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
          <div className="main-scroll">
            <div className="main-grid">
              <div className="registry-panel">
                <RegistryTable tracks={tracks} selectedId={selectedId} onSelectRow={setSelectedId} />
              </div>

              <ItemDetails track={selectedTrack} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
