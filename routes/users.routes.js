const express = require('express');
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/user.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

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
    usersController.update
  )
  .delete(
    usersMiddleware.validExistUser,
    usersController.delete
  );

module.exports = router;
