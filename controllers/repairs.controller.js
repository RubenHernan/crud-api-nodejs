const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');

exports.list = catchAsync(async (req, res) => {
  const { requestTime } = req;

  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    results: repairs.length,
    repairs,
  });
});

exports.create = catchAsync(async (req, res) => {
  const { requestTime } = req;
  const { date, userId } = req.body;
  const repair = await Repair.create({
    date,
    userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'The repair has been created!',
    requestTime,
    repair,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { repair, requestTime } = req;

  await repair.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'Repair updated successfully!',
    requestTime,
  });
});

exports.show = catchAsync(async (req, res) => {
  const { requestTime, repair } = req;

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    repair,
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { requestTime, repair } = req;

  await repair.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done!',
    requestTime,
    repair,
  });
});
