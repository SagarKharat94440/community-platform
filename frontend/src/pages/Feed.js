import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import '../styles/Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="feed-container">
      <div className="feed-content">
        <div className="feed-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Share your thoughts with the community</p>
        </div>

        <CreatePost onPostCreated={handlePostCreated} />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchPosts} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        <div className="posts-section">
          {posts.length === 0 ? (
            <div className="no-posts">
              <h3>No posts yet</h3>
              <p>Be the first to share something with the community!</p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  onPostUpdate={handlePostUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;