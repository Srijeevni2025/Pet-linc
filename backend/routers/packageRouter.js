const express = require("express");
const router = express.Router();
const packageController = require('./../controllers/packageController')
router.route('/create-new-package').post( packageController.createPackage);
router.route('/get-all-packages/:city').get(packageController.getAllPackages);

module.exports = router;