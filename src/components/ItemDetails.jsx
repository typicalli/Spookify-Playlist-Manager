import RoleBadge from './RoleBadge.jsx'

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function ItemDetails({ track }) {
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
        <div className="details-row">
          <dt>User Role</dt>
          <dd>
            <RoleBadge role={track.role} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default ItemDetails
