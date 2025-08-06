# Project Title

A brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables.

## Usage

To start the server, run:
```
npm start
```
The server will run on the specified port (default is 5000).

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in an existing user

### Users
- **GET** `/api/users/me` - Get current user profile
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/me` - Update user profile

### Posts
- **GET** `/api/posts` - Get all posts
- **POST** `/api/posts` - Create a new post
- **GET** `/api/posts/user/:userId` - Get posts by user
- **POST** `/api/posts/:id/like` - Like/Unlike a post
- **POST** `/api/posts/:id/comment` - Add a comment to a post

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `CLIENT_URL` - URL of the client application
- `PORT` - Port number for the server (default is 5000)

## License

This project is licensed under the MIT License.