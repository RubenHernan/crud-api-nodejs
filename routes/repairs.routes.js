const express = require('express');
const repairController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repair.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairController.list)
  .post(
    repairMiddleware.validRepair,
    repairController.create
  );

router
  .route('/:id')
  .get(
    repairMiddleware.validRepairPending,
    repairController.show
  )
  .patch(
    repairMiddleware.validRepair,
    repairMiddleware.validRepairPending,
    repairController.update
  )
  .delete(
    repairMiddleware.validRepairPending,
    repairController.delete
  );

module.exports = router;
