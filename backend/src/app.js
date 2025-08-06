const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://community-platform-two.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);

    // Allow production + localhost
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any *.vercel.app preview URL
    if (/^https:\/\/community-platform-.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed by server"));
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
