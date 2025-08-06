// filepath: /backend/src/routes/userRoutes.js
const express = require('express');
const { getCurrentUserProfile, getUserById, updateUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get current user profile
router.get('/me', authenticateToken, getCurrentUserProfile);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user profile
router.put('/me', authenticateToken, updateUserProfile);

module.exports = router;