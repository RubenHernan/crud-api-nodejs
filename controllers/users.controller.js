const User = require('../models/user.model');

exports.list = async (req, res) => {
  const { requestTime } = req;

  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    results: users.length,
    users,
  });
};

exports.create = async (req, res) => {
  const { requestTime } = req;
  const { name, email, password, role } =
    req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(404).json({
      status: 'error',
      message:
        'User with that email already exists',
    });
  }

  const userCreate = await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user has been created!',
    requestTime,
    userCreate,
  });
};

exports.update = async (req, res) => {
  const { user, requestTime } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully!',
    requestTime,
  });
};

exports.show = async (req, res) => {
  const { requestTime, user } = req;

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    user,
  });
};

exports.delete = async (req, res) => {
  const { requestTime, user } = req;

  await user.update({
    status: 'inavailable',
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    user,
  });
};
