const express = require('express');
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/user.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/').get(usersController.list);

router
  .route('/:id')
  .get(
    usersMiddleware.validExistUser,
    usersController.show
  )
  .patch(
    validationMiddleware.updateUserValidation,
    usersMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    usersController.update
  )
  .delete(
    usersMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    usersController.delete
  );

module.exports = router;
