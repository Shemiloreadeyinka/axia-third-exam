const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('user',email)
    return res.cookie('token', token, {
        // maxAge: 1000 * 60 * 60,
        // secure: false,
        httpOnly: true,
      }).json({ message: 'This was successful' }), console.log(req.cookies)} catch (err) {res.status(500).json({ msg: 'Server error' }); }
 ;
      
};

exports.Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "We encountered an error deleting this user" });
  }
};

exports.getOneUser = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id).populate('posts').populate('kyc');
    return res.status(200).json({ message: 'User retrieved', user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Users retrieved successfully", users: users });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};
