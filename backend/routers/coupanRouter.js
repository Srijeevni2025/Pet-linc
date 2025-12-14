const express = require('express');
const router = express.Router();
const coupanController = require('./../controllers/coupanController');

router.route('/create-new-coupan').post(coupanController.createCoupan)


module.exports = router;