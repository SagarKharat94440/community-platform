# LinkedIn Clone - MERN Stack Social Media Platform

## 🚀 Project Overview

This is a comprehensive Mini LinkedIn-like Community Platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) .

## ✅ Features Implemented

### 🔐 User Authentication
- Complete register/login system with email & password
- JWT-based secure authentication with token management
- Password hashing using bcryptjs for security
- Protected routes with authentication middleware

### 👤 User Profile Management
- Individual user profile pages showing user details
- Edit profile functionality (name, bio, profile picture)
- View user's posts and statistics
- Professional LinkedIn-like interface design

### 📝 Post System
- Create and display text-only posts (up to 1000 characters)
- Chronological feed showing all posts with timestamps
- Like/unlike posts with real-time updates
- Comment system for user engagement
- Character counters and input validation

### 🎨 Additional Features
- Responsive design for mobile and desktop
- Loading states and comprehensive error handling
- Professional UI with LinkedIn-inspired styling
- Real-time post creation without page refresh

## 🛠 Tech Stack

**Backend:**
- Node.js (JavaScript runtime)
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS (Cross-origin requests)

**Frontend:**
- React.js (UI library)
- React Router (Navigation)
- Axios (HTTP client)
- Context API (State management)
- CSS3 (Styling)

## 📁 Project Structure

```
linkedin-clone-ciaan/
├──backend/
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── src/
        ├── app.js                 # Main Express app configuration
        ├── server.js              # Server entry point
        ├── controllers/
        │   ├── authController.js  # Authentication logic (login, register)
        │   ├── postController.js  # Post operations (create, get, like, comment)
        │   └── userController.js  # User operations (profile, update)
        ├── middleware/
        │   └── authMiddleware.js  # JWT authentication middleware
        ├── models/
        │   ├── post.js           # Post data model
        │   └── user.js           # User data model
        └── routes/
            ├── authRoutes.js      # Authentication endpoints
            ├── postRoutes.js      # Post-related endpoints
            └── userRoutes.js      # User-related endpoints
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js       # Navigation component
│   │   │   ├── PostCard.js     # Individual post component
│   │   │   ├── CreatePost.js   # Create new post component
│   │   │   ├── EditProfile.js  # Edit profile modal
│   │   │   └── LoadingSpinner.js # Loading component
│   │   ├── pages/
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Registration page
│   │   │   ├── Feed.js         # Main feed page
│   │   │   └── Profile.js      # User profile page
│   │   ├── contexts/
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── styles/
│   │   │   ├── App.css         # Main application styles
│   │   │   ├── Auth.css        # Login/Register styles
│   │   │   ├── Navbar.css      # Navigation styles
│   │   │   ├── Feed.css        # Feed page styles
│   │   │   ├── Profile.css     # Profile page styles
│   │   │   ├── PostCard.css    # Post component styles
│   │   │   ├── CreatePost.css  # Create post styles
│   │   │   ├── EditProfile.css # Edit profile styles
│   │   │   └── LoadingSpinner.css # Loading spinner styles
│   │   ├── App.js              # Main React application
│   │   └── index.js            # React entry point
│   ├── package.json            # Frontend dependencies
│   └── .env                    # Frontend environment variables
└── README.md                   # Project documentation
```

## ⚙️ Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Update `.env` file with your MongoDB connection string and JWT secret.

4. **Start the backend server:**
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Update `.env` file with your backend API URL.

4. **Start the frontend:**
```bash
npm start
```

## 🗃 Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community  # macOS

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

### Option 2: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Push backend code to GitHub
2. Create new web service
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push frontend code to GitHub
2. Import project
3. Set `REACT_APP_API_URL` to backend URL
4. Deploy

## 🔐 Security Features

- JWT Authentication with secure token management
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Environment variables for sensitive data

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/me` - Update user profile

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create new post
- `GET /api/posts/user/:userId` - Get posts by user
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment to post

## 🧪 Testing

### Test User Accounts
Create test accounts or use demo credentials:
- **Email:** demo@example.com
- **Password:** password123

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI/UX Features

- Professional LinkedIn-inspired design
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation
- Mobile-first responsive design

## 🔧 Development

### Code Quality
- Modern ES6+ JavaScript
- Component-based React architecture
- RESTful API design
- Proper error handling
- Input validation

### Performance
- Optimized database queries
- Efficient state management
- Lazy loading components
- Compressed assets




