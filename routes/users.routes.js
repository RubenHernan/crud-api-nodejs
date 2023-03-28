const express = require('express');
const usersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router
  .route('/')
  .get(usersController.list)
  .post(
    usersMiddleware.validUser,
    usersController.create
  );

router
  .route('/:id')
  .get(
    usersMiddleware.validExistUser,
    usersController.show
  )
  .patch(
    usersMiddleware.validUser,
    usersMiddleware.validExistUser,
    usersController.update
  )
  .delete(
    usersMiddleware.validExistUser,
    usersController.delete
  );

module.exports = router;
