const Repair = require('../models/repair.model');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

// exports.validRepair = (req, res, next) => {
//   const { date, userId } = req.body;
//   if (date === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the date is required',
//     });
//   }
//   if (userId === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the user is required',
//     });
//   }
//   next();
// };

exports.validRepairPending = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
      },
    });

    if (!repair) {
      return next(
        new AppError('Repair not found', 404)
      );
    } else if (repair.status !== 'pending') {
      return next(
        new AppError(
          'Repair is not pending!',
          404
        )
      );
    }
    req.repair = repair;
    next();
  }
);
