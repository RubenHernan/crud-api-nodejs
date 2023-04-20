const authController = require('../controllers/auth.controller');
const validations = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const express = require('express');

const router = express.Router();

router.post(
  '/register',
  validations.authValidation,
  authController.create
);

router.post(
  '/login',
  validations.loginUserValidation,
  authController.login
);

router.use(authMiddleware.protect);

router.get('/renew', authController.renew);

module.exports = router;
