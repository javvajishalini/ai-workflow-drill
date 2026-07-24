import { useState } from 'react'
import './App.css'

function App() {
  const initialSettings = {
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Software developer and tech enthusiast.',
    theme: 'light',
    emailNotifications: true,
    visibility: 'public'
  }

  const [settings, setSettings] = useState(initialSettings)
  const [isSaved, setIsSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setIsSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaved(true)
  }

  const handleReset = () => {
    setSettings(initialSettings)
    setIsSaved(false)
  }

  return (
    <div className="settings-container">
      <h2 className="settings-title">User Settings</h2>
      <p className="settings-subtitle">Manage your account preferences</p>

      {isSaved && (
        <div className="alert-success">
          ✓ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            value={settings.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            value={settings.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            className="form-textarea"
            value={settings.bio}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="theme">Theme Preference</label>
          <select
            id="theme"
            name="theme"
            className="form-select"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Profile Visibility</label>
          <div className="radio-options">
            <label className="radio-item">
              <input
                type="radio"
                name="visibility"
                value="public"
                className="form-radio"
                checked={settings.visibility === 'public'}
                onChange={handleChange}
              />
              <span className="radio-label">Public</span>
            </label>
            <label className="radio-item">
              <input
                type="radio"
                name="visibility"
                value="private"
                className="form-radio"
                checked={settings.visibility === 'private'}
                onChange={handleChange}
              />
              <span className="radio-label">Private</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              id="emailNotifications"
              type="checkbox"
              name="emailNotifications"
              className="form-checkbox"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <label htmlFor="emailNotifications" className="checkbox-label">
              Receive email notifications
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Settings
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
