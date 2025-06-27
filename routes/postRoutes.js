const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Post = require('../models/post');

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, author: req.user });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating post' });
  }
});

router.get('/', auth, async (req, res) => {
  const posts = await Post.find({ author: req.user });
  res.json(posts);
});


module.exports = router;
