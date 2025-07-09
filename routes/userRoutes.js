const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authMiddleware');
const { register, login, Delete, getAllUsers, getOneUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', authentication, Delete);
router.get('/getusers', getAllUsers);
router.get('/getuser', authentication, getOneUser);

module.exports = router;
