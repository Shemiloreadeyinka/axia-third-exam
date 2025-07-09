const Post = require("../models/Post")
const User = require("../models/User")


exports.createPost = async (req, res) => {
  const body = req.body;
  const id = req.user.id;
  try {
    const newPost = new Post({ user: id, ...body });
    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(id, { $push: { posts: savedPost._id } }, { new: true });
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('user');
    return res.status(200).json({ message: post });
  } catch (error) {
    res.status(500).json({ msg: "post not found" });
  }
};

exports.getUserPost = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ user: id });
    return res.status(200).json({ message: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post does not exist' });
    if (post.user.toString() !== userId) return res.status(403).json({ msg: 'This is not your post to delete' });

    const deletedPost = await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(post.user, { $pull: { posts: post._id } }, { new: true });
    res.status(200).json({ message: deletedPost });
  } catch (error) {
    res.status(500).json({ message: "We encountered problems deleting this post" });
  }
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post does not exist' });
    if (post.user.toString() !== userId) return res.status(403).json({ message: 'This is not your post to update' });

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    res.status(200).json({ message: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
