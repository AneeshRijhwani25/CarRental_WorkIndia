const db = require('../models');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require("../utils/apiResponse");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    throw { statusCode: 400, message: 'Missing required fields' };
  }

  const user = await db.User.create({ username, password, email });
  
  res.status(200).json(ApiResponse.success({
    user_id: user.id,
    status: 'Account successfully created'
  }));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  const user = await db.User.findOne({ where: { username } });

  if (!user || !(await user.isPasswordCorrect(password))) {
    res.status(401).json({
        status: "Incorrect username/password provided. Please retry",
        status_code: 401
      });
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json(ApiResponse.success({
    user_id: user.id,
    access_token: accessToken,
    refresh_token: refreshToken,
    status: 'Login successful'
  }));
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw { statusCode: 401, message: 'Refresh Token required' };
  }

  const user = await db.User.findOne({ where: { refreshToken } });

  if (!user) {
    throw { statusCode: 403, message: 'Invalid Refresh Token' };
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw { statusCode: 403, message: 'Invalid Refresh Token' };
    }

    const newAccessToken = user.generateAccessToken();
    res.status(200).json(ApiResponse.success({ access_token: newAccessToken }));
  });
});

module.exports = { registerUser, loginUser, refreshAccessToken };
