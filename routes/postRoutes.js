const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authMiddleware');
const {createPost,getSinglePost,deletePost} = require('../controllers/postController');

router.post('/create',authentication,createPost)

router.get('/delete',deletePost);


module.exports = router;
