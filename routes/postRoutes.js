const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authMiddleware');
const { createPost, getSinglePost, deletePost, updatePost, getUserPost } = require('../controllers/postController');

router.post('/create', authentication, createPost);

router.delete('/delete/:postId', authentication, deletePost);

router.put('/update/:postId', authentication, updatePost);

router.get('/user/:id', authentication, getUserPost);

router.get('/:id', getSinglePost);

module.exports = router;
