import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import EditProfile from '../components/EditProfile';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser, updateProfile } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = !userId || userId === currentUser?.id;
  const targetUserId = userId || currentUser?.id;

  useEffect(() => {
    if (targetUserId) {
      fetchProfileData();
    }
  }, [targetUserId]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch user profile
      const userResponse = isOwnProfile 
        ? await axios.get('/api/users/me')
        : await axios.get(`/api/users/${targetUserId}`);

      setProfileUser(userResponse.data);

      // Fetch user's posts
      const postsResponse = await axios.get(`/api/posts/user/${targetUserId}`);
      setPosts(postsResponse.data);

    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  const handleProfileUpdate = async (profileData) => {
    if (isOwnProfile) {
      const result = await updateProfile(profileData);
      if (result.success) {
        setProfileUser({ ...profileUser, ...profileData });
        setIsEditing(false);
      }
      return result;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="profile-error">
        <div className="error-message">
          {error}
          <button onClick={fetchProfileData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="profile-error">
        <div className="error-message">User not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              {profileUser.profilePicture ? (
                <img src={profileUser.profilePicture} alt={profileUser.name} />
              ) : (
                <div className="avatar-placeholder">
                  {profileUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="profile-details">
              <h1>{profileUser.name}</h1>
              <p className="profile-email">{profileUser.email}</p>
              {profileUser.bio && (
                <p className="profile-bio">{profileUser.bio}</p>
              )}
              <div className="profile-stats">
                <span>{posts.length} posts</span>
                <span>Member since {new Date(profileUser.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {isOwnProfile && (
            <div className="profile-actions">
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-profile-btn"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <EditProfile
            user={profileUser}
            onSave={handleProfileUpdate}
            onCancel={() => setIsEditing(false)}
          />
        )}

        {/* Posts Section */}
        <div className="profile-posts">
          <h2>{isOwnProfile ? 'Your Posts' : `${profileUser.name}'s Posts`}</h2>

          {posts.length === 0 ? (
            <div className="no-posts">
              <p>{isOwnProfile ? 'You haven\'t posted anything yet.' : 'No posts to show.'}</p>
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

export default Profile;