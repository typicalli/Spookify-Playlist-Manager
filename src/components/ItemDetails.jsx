function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

function ItemDetails({ track, onDelete }) {
  if (!track) {
    return (
      <div className="details-card details-empty">
        <MusicIcon />
        <p>Select a track from the registry to view its details.</p>
      </div>
    )
  }

  const fields = [
    { label: 'Artist', value: track.artist },
    { label: 'Genre', value: track.genre },
    { label: 'Rating / BPM', value: track.rating },
    { label: 'Record Label', value: track.label },
    { label: 'User Role', value: track.role },
  ]

  return (
    <div className="details-card">
      <p className="details-eyebrow">Active Track Details</p>
      <div className="details-art">
        <MusicIcon />
      </div>
      <h3 className="details-title">{track.title}</h3>
      <p className="details-subtitle">{track.artist}</p>

      <dl className="details-list">
        {fields.map((field) => (
          <div className="details-row" key={field.label}>
            <dt>{field.label}</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>

      <button type="button" className="delete-btn" onClick={() => onDelete(track.id)}>
        <TrashIcon />
        Delete Track
      </button>
    </div>
  )
}

export default ItemDetails
