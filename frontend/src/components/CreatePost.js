import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const MAX_CHARACTERS = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Please write something to post');
      return;
    }

    if (content.length > MAX_CHARACTERS) {
      setError(`Post is too long. Maximum ${MAX_CHARACTERS} characters allowed.`);
      return;
    }

    try {
      setIsPosting(true);
      setError('');

      const response = await axios.post('/api/posts', {
        content: content.trim()
      });

      onPostCreated(response.data.post);
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (error) setError('');
  };

  const remainingCharacters = MAX_CHARACTERS - content.length;

  return (
    <div className="create-post">
      <div className="create-post-header">
        <div className="user-avatar">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="post-prompt">
          <h3>Share your thoughts, {user.name.split(' ')[0]}!</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-post-form">
        {error && <div className="error-message">{error}</div>}

        <div className="post-input-container">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="What's on your mind? Share your professional insights, achievements, or thoughts with the community..."
            className="post-textarea"
            rows="4"
            disabled={isPosting}
          />

          <div className="post-input-footer">
            <div className="character-count">
              <span className={remainingCharacters < 50 ? 'warning' : ''}>
                {remainingCharacters} characters remaining
              </span>
            </div>

            <button 
              type="submit" 
              className="post-button"
              disabled={isPosting || !content.trim() || content.length > MAX_CHARACTERS}
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;