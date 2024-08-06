const db = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// Add a car (Admin only)
const addCar = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: "Forbidden: Admins only",
      status_code: 403
    });
  }

  const { category, model, numberPlate, currentCity, rentPerHr } = req.body;
  const car = await db.Car.create({ category, model, numberPlate, currentCity, rentPerHr });

  res.status(200).json(ApiResponse.success({
    car_id: car.id,
    status: 'Car added successfully'
  }));
});

// Get available rides
const getAvailableRides = asyncHandler(async (req, res) => {
  const { origin, destination, category, required_hours } = req.query;
  const availableCars = await db.Car.findAll({ where: { category, currentCity: origin } });

  const rides = availableCars.map(car => ({
    car_id: car.id,
    category: car.category,
    model: car.model,
    number_plate: car.numberPlate,
    current_city: car.currentCity,
    rent_per_hr: car.rentPerHr,
    rent_history: car.rentHistory,
    total_payable_amt: car.rentPerHr * required_hours
  }));

  res.status(200).json(ApiResponse.success(rides));
});

// Rent a car
const rentCar = asyncHandler(async (req, res) => {
  const { car_id, origin, destination, hours_requirement } = req.body;
  const userId = req.user.id;

  const car = await db.Car.findByPk(car_id);
  if (!car) {
    return res.status(404).json({
      status: "Car not found",
      status_code: 404
    });
  }

  const rent = await db.Rent.create({
    userId,
    carId: car_id,
    origin,
    destination,
    hoursRequirement: hours_requirement,
    totalPayableAmt: car.rentPerHr * hours_requirement
  });

  res.status(200).json(ApiResponse.success({
    rent_id: rent.id,
    total_payable_amt: rent.totalPayableAmt,
    status: 'Car rented successfully'
  }));
});

module.exports = { addCar, getAvailableRides, rentCar };
