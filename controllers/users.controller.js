const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.list = catchAsync(async (req, res) => {
  const { requestTime } = req;

  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    results: users.length,
    users,
  });
});

exports.update = catchAsync(async (req, res) => {
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
});

exports.show = catchAsync(async (req, res) => {
  const { requestTime, user } = req;

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    user,
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { requestTime, user } = req;

  await user.update({
    status: 'inavailable',
  });

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
    requestTime,
    user,
  });
});
