const express = require('express');
const repairController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repair.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  validationMiddleware.repairValidation,
  repairController.create
);

router.use(authMiddleware.restrictTo('employee'));

router.route('/').get(repairController.list);

router
  .route('/:id')
  .get(
    repairMiddleware.validRepairPending,
    repairController.show
  )
  .patch(
    repairMiddleware.validRepairPending,
    repairController.update
  )
  .delete(
    repairMiddleware.validRepairPending,
    repairController.delete
  );

module.exports = router;
