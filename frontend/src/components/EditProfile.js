import React, { useState } from 'react';
import '../styles/EditProfile.css';

const EditProfile = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    profilePicture: user.profilePicture || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (formData.bio.length > 500) {
      setError('Bio must be less than 500 characters');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const result = await onSave(formData);

      if (!result.success) {
        setError(result.error || 'Failed to update profile');
      }
    } catch (error) {
      setError('An error occurred while updating your profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button onClick={onCancel} className="close-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows="4"
              maxLength="500"
              disabled={isLoading}
            />
            <small className="char-count">{formData.bio.length}/500 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input
              type="url"
              id="profilePicture"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://..."
              disabled={isLoading}
            />
            <small>Enter a URL to your profile picture</small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;