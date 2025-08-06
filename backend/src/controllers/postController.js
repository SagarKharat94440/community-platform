const Post = require('../models/post');
const User = require('../models/user');

// Get all posts (feed)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email profilePicture')
            .populate('likes.user', 'name')
            .populate('comments.user', 'name')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(posts);
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new post
exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Post content is required' });
        }

        if (content.length > 1000) {
            return res.status(400).json({ message: 'Post content too long (max 1000 characters)' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = new Post({
            content: content.trim(),
            author: req.user.id,
            authorName: user.name
        });

        await post.save();

        const populatedPost = await Post.findById(post._id)
            .populate('author', 'name email profilePicture');

        res.status(201).json({
            message: 'Post created successfully',
            post: populatedPost
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get posts by user
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId })
            .populate('author', 'name email profilePicture')
            .populate('likes.user', 'name')
            .populate('comments.user', 'name')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Like/Unlike post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const likeIndex = post.likes.findIndex(
            like => like.user.toString() === req.user.id
        );

        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push({ user: req.user.id });
        }

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate('author', 'name email profilePicture')
            .populate('likes.user', 'name');

        res.json({
            message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
            post: updatedPost
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add comment to post
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(req.user.id);

        post.comments.push({
            user: req.user.id,
            username: user.name,
            text: text.trim()
        });

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate('author', 'name email profilePicture')
            .populate('comments.user', 'name');

        res.json({
            message: 'Comment added successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};