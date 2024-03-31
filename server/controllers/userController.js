const User = require("../models/user");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.login = catchAsync(async (req, res,next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.status(200).json({ user });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.json(users);
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("previousRides");
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  res.json(user);
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password, role, name, phoneNumber } = req.body;

  const newUser = new User({
    email,
    password,
    role,
    name,
    phoneNumber,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }

  if (req.body.email) {
    user.email = req.body.email;
  }
  // if (req.body.password) {
  //   user.password = req.body.password;
  // }
  if (req.body.role) {
    user.role = req.body.role;
  }
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.phoneNumber) {
    user.phoneNumber = req.body.phoneNumber;
  }

  const updatedUser = await user.save();
  res.json(updatedUser);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }
  await User.deleteOne({ _id: req.params.id });
  res.json({ message: "User deleted" });
});

exports.getPreviousRides = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not Found", 404));
  }

  res.status(200).json(user.previousRides);
});
