import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/PostCard.css';

const PostCard = ({ post, onPostUpdate }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const isLiked = post.likes?.some(like => like.user._id === user.id || like.user === user.id);
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await axios.post(`/api/posts/${post._id}/like`);
      onPostUpdate(response.data.post);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isCommenting) return;

    try {
      setIsCommenting(true);
      const response = await axios.post(`/api/posts/${post._id}/comment`, {
        text: newComment.trim()
      });
      onPostUpdate(response.data.post);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {post.author?.profilePicture ? (
              <img src={post.author.profilePicture} alt={post.author.name} />
            ) : (
              <div className="avatar-placeholder">
                {(post.author?.name || post.authorName).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="author-info">
            <Link 
              to={`/profile/${post.author?._id}`} 
              className="author-name"
            >
              {post.author?.name || post.authorName}
            </Link>
            <span className="post-time">{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Post Stats */}
      <div className="post-stats">
        <span>{likesCount} likes</span>
        <span>{commentsCount} comments</span>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button 
          onClick={handleLike}
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          disabled={isLiking}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {isLiking ? 'Liking...' : 'Like'}
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="action-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Comment
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Add Comment Form */}
          <form onSubmit={handleComment} className="add-comment">
            <div className="comment-avatar">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="comment-input">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                disabled={isCommenting}
              />
              <button 
                type="submit" 
                disabled={!newComment.trim() || isCommenting}
                className="comment-submit"
              >
                {isCommenting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {post.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-avatar">
                  <div className="avatar-placeholder">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.username}</span>
                    <span className="comment-time">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;