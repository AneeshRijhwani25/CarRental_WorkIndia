const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/user');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', verifyJWT, refreshAccessToken);

module.exports = router;
