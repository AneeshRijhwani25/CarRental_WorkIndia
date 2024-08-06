const express = require('express');
const router = express.Router();
const { addCar, getAvailableRides, rentCar } = require('../controllers/car');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/car/create', verifyJWT, addCar);
router.get('/car/get-rides', verifyJWT, getAvailableRides);
router.post('/car/rent', verifyJWT, rentCar);

module.exports = router;
