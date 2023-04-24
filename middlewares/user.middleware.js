const User = require('../models/user.model');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');

// exports.validUser = (req, res, next) => {
//   const { name, email, password, role } =
//     req.body;
//   if (name === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the name is required',
//     });
//   }
//   if (email === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the email is required',
//     });
//   }
//   if (password === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the pass is required',
//     });
//   }
//   if (role === false) {
//     return res.status(400).json({
//       status: 'error',
//       message: 'the role is required',
//     });
//   }
//   next();
// };

exports.validExistUser = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return next(
        new AppError('User not found', 404)
      );
    }
    req.user = user;
    next();
  }
);
