import { useState } from 'react'

const GENRES = ['Pop', 'Rock', 'Indie', 'Jazz', 'K-Pop']

const initialFormState = {
  title: '',
  genre: '',
  artist: '',
  rating: '',
  label: '',
  role: '',
}

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function DiscIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20a8 8 0 1 0-8-8" />
      <path d="M12 12 16 8" />
      <path d="M12 12v.01" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.5 3H4a1 1 0 0 0-1 1v5.5a2 2 0 0 0 .83 1.5l9.58 9.59a2 2 0 0 0 2.83 0l4.35-4.35a2 2 0 0 0 0-2.83Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function validate(values) {
  const errors = {}

  if (!values.title.trim()) {
    errors.title = 'Track title is required.'
  } else if (values.title.trim().length < 3) {
    errors.title = 'Track title must be at least 3 characters.'
  }

  if (!values.genre) {
    errors.genre = 'Please select a genre.'
  }

  if (!values.artist.trim()) {
    errors.artist = 'Artist name is required.'
  }

  if (values.rating === '') {
    errors.rating = 'Rating / BPM is required.'
  } else {
    const rating = Number(values.rating)
    if (Number.isNaN(rating) || rating < 1 || rating > 100) {
      errors.rating = 'Enter a value between 1 and 100.'
    }
  }

  if (!values.label.trim()) {
    errors.label = 'Record label name is required.'
  }

  if (!values.role) {
    errors.role = 'Please select a user role.'
  }

  return errors
}

function PlaylistForm({ onAddTrack }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onAddTrack({
        ...formData,
        title: formData.title.trim(),
        artist: formData.artist.trim(),
        label: formData.label.trim(),
        rating: Number(formData.rating),
      })
      setFormData(initialFormState)
      setErrors({})
    }
  }

  return (
    <form className="playlist-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">
          <MusicNoteIcon />
          Track Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Midnight City"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'invalid' : ''}
        />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      <div className="field">
        <label htmlFor="genre">
          <DiscIcon />
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className={errors.genre ? 'invalid' : ''}
        >
          <option value="">Select a genre…</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && <p className="field-error">{errors.genre}</p>}
      </div>

      <div className="field">
        <label htmlFor="artist">
          <MicIcon />
          Artist Name
        </label>
        <input
          id="artist"
          name="artist"
          type="text"
          placeholder="e.g. M83"
          value={formData.artist}
          onChange={handleChange}
          className={errors.artist ? 'invalid' : ''}
        />
        {errors.artist && <p className="field-error">{errors.artist}</p>}
      </div>

      <div className="field">
        <label htmlFor="rating">
          <GaugeIcon />
          Rating / BPM
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="100"
          placeholder="1–100"
          value={formData.rating}
          onChange={handleChange}
          className={errors.rating ? 'invalid' : ''}
        />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>

      <div className="field">
        <label htmlFor="label">
          <TagIcon />
          Record Label Name
        </label>
        <input
          id="label"
          name="label"
          type="text"
          placeholder="e.g. Astralwerks"
          value={formData.label}
          onChange={handleChange}
          className={errors.label ? 'invalid' : ''}
        />
        {errors.label && <p className="field-error">{errors.label}</p>}
      </div>

      <div className="field">
        <span className="radio-legend">
          <UsersIcon />
          User Role
        </span>
        <div className="radio-group">
          <label className={`radio-option ${formData.role === 'Creator' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="role"
              value="Creator"
              checked={formData.role === 'Creator'}
              onChange={handleChange}
            />
            Creator
          </label>
          <label className={`radio-option ${formData.role === 'Listener' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="role"
              value="Listener"
              checked={formData.role === 'Listener'}
              onChange={handleChange}
            />
            Listener
          </label>
        </div>
        {errors.role && <p className="field-error">{errors.role}</p>}
      </div>

      <button type="submit" className="submit-btn">
        <PlusIcon />
        Add Track
      </button>
    </form>
  )
}

export default PlaylistForm
