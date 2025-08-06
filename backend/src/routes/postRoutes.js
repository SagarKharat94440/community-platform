const express = require('express');
const { 
    createPost, 
    getAllPosts, 
    getPostsByUser, // <-- match the export name
    likePost, 
    addComment 
} = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all posts
router.get('/', authenticateToken, getAllPosts);

// Create new post
router.post('/', authenticateToken, createPost);

// Get posts by user
router.get('/user/:userId', authenticateToken,  getPostsByUser);

// Like/Unlike post
router.post('/:id/like', authenticateToken, likePost);

// Add comment to post
router.post('/:id/comment', authenticateToken, addComment);

module.exports = router;