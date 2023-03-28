const Repair = require('../models/repair.model');

exports.validRepair = (req, res, next) => {
  const { date, userId } = req.body;
  if (date === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the date is required',
    });
  }
  if (userId === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the user is required',
    });
  }
  next();
};

exports.validRepairPending = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  } else if (repair.status !== 'pending') {
    return res.status(404).json({
      status: 'error',
      message: 'Repair is not pending!',
    });
  }
  req.repair = repair;
  next();
};
