const {
  body,
  validationResult,
} = require('express-validator');

const validFields = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: error.mapped(),
    });
  }
  next();
};

//Validating user

exports.authValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Must be a email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  body('role')
    .notEmpty()
    .withMessage('The role is required'),
  validFields,
];

exports.updateUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Must be a email!'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];

exports.updatedPasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  body('newPassword')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];

//validating repairs

exports.repairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date is required!')
    .isDate()
    .withMessage('Must be a date!'),
  body('userId')
    .notEmpty()
    .withMessage('User is required!'),
  body('motorsNumber')
    .notEmpty()
    .withMessage(
      'Number of the motor is required!'
    ),
  body('description')
    .notEmpty()
    .withMessage('Description is required!'),
  validFields,
];
