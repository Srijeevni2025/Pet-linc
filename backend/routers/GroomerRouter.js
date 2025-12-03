const express = require("express");
const router = express.Router();
const groomerController = require("./../controllers/GroomingCenterController");
router.route('/create-new-groomer').post(groomerController.createGroomingCenter)
router.route('/get-all-groomers').get(groomerController.getAllGroomers);
router.route('/:id').get(groomerController.getOneGroomer)

module.exports = router;