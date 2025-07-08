const express = require('express');
const router = express.Router();
const { register, login , Delete, getAllUsers , getOneUser} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', Delete );
router.get('/getusers', getAllUsers)
router.get('/getuser', getOneUser)

module.exports = router;
